import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema } from 'graphql-tools'
import queryParams from 'utils/query-params'
import request from 'utils/request'
import processHistory, { getPagesSpeed } from 'utils/process-history'
import { minBy, maxBy } from 'utils/min-by'
import typeDefs from '../../dev-tools/schema.graphql'
import { Book, RawHistory, BookHistory } from 'models/book'
import { UPDATE } from './sql'
import { deleteBook } from './book'

const ENDPOINT = '/api/sql'
const booksMap = {
  id: 'MD5',
  author: 'Authors',
  title: 'Title',
  thumbnail: '(SELECT COUNT(*) FROM library_thumbnail WHERE Source_MD5 = MD5 LIMIT 1)',
  progress: 'Progress',
  status: 'Status',
  size: 'Size',
  location: 'Location',
}

function fetchList(table: string, map: Record<string, string>) {
  return (_, vars) => {
    const { order, limit = 20, offset = 0, where } = vars

    return {
      total: (_, __, { variableValues }) => {
        if (variableValues?.total) return variableValues.total

        return fetchData({ table, where, fields: ['COUNT(*) as count'] }).then(r => r[0].count ?? 0)
      },
      items: (_, __, info) => {
        const fields = getFields(info.fieldNodes[0], map)

        return fetchData({ table, fields, where, order, limit, offset })
      },
    }
  }
}

function fetchData(query) {
  return request(`${ENDPOINT}?${queryParams(query)}`)
}

function getFields(node, map: Record<string, string>): any {
  const name = node.name.value,
    children = node.selectionSet?.selections

  if (children) {
    return children.map(n => getFields(n, map)).filter(n => n !== '__typename')
  }

  return name in map ? `${map[name]} as ${name}` : name
}

function fetchBook(_, vars, __, info) {
  const omit = ['history', 'rawHistory', 'startRead', 'endRead', 'readTime', 'lastRead', 'speed', 'readPages']
  const bookQuery = {
    fields: getFields(info.fieldNodes[0], booksMap).filter(f => typeof f === 'string' && !omit.includes(f)),
    table: 'library_metadata',
    where: `MD5 = "${vars.id}"`,
  }
  const historyQuery = {
    fields: ['StartTime as date', 'EndTime', '(EndTime - StartTime) AS time', 'Progress AS progress'],
    table: 'library_history',
    where: `MD5 = "${vars.id}"`,
    order: 'StartTime',
    limit: -1,
  }

  return Promise.all([
    fetchData(bookQuery).then(b => b[0]) as Promise<Book>,
    fetchData(historyQuery) as Promise<RawHistory[]>,
  ]).then(([book, history]) => {
    book.status = +book.status

    book.history = processHistory(history || [])
    book.debugHistory = processHistory(history || [], true)

    if (book.history.length > 0) {
      book.startRead = +minBy(history, 'date')
      book.endRead = +maxBy(history, 'EndTime')
      book.readPages = book.history.reduce((pages: number, item: BookHistory) => pages + item.pages, 0)
      book.readTime = book.history.reduce((time: number, item: BookHistory) => time + item.time, 0)
      book.speed = book.readPages > 0 && book.readTime > 0 ? getPagesSpeed(book.readTime, book.readPages) : 0
    }

    book.lastRead = book.history.length > 0 ? book.history[book.history.length - 1].date : ''

    return book
  })
}

const resolvers = {
  Query: {
    books: fetchList('library_metadata', booksMap),
    book: fetchBook,
  },
  Mutation: {
    async changeStatus(_, { id, status }) {
      await UPDATE('library_metadata', { where: `MD5 = "${id}"`, status })

      return { id, status }
    },
    async deleteBook(_, { id, status }) {
      await deleteBook(id)

      return { id, status }
    },
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export const client = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache(),
})
