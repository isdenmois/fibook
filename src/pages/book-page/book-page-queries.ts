import { Book } from 'models/book'

import gql from 'graphql-tag'
import { BOOKS_QUERY, READ_LIST_VARS, NEW_LIST_VARS } from 'pages/home-page/home-page-queries'

export const BOOK_QUERY = gql`
  query BookQuery($id: ID!) {
    book(id: $id) {
      id
      author
      title
      progress
      status
      size
      location
      thumbnail
      lastRead
      debugHistory {
        date
        pages
        percent
        progress
        speed
        time
      }
      history {
        date
        pages
        percent
        progress
        speed
        time
      }
    }
  }
`

export const UPDATE_STATUS = gql`
  mutation changeStatus($id: ID!, $status: Int!) {
    changeStatus(id: $id, status: $status) {
      id
      status
    }
  }
`
export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!, $status: Int) {
    deleteBook(id: $id, status: $status) {
      id
      status
    }
  }
`
const NEW_QUERY = { query: BOOKS_QUERY, variables: NEW_LIST_VARS }
const READ_QUERY = { query: BOOKS_QUERY, variables: READ_LIST_VARS }

export function changeStatusUpdate(proxy, { data: { changeStatus } }) {
  const newData: any = proxy.readQuery(NEW_QUERY)
  const readData: any = proxy.readQuery(READ_QUERY)
  const newList = { ...newData.books }
  const readList = { ...readData.books }
  const find = (b: Book) => b.id === changeStatus.id
  const filter = (b: Book) => b.id !== changeStatus.id

  if (changeStatus.status === 1) {
    const book = newList.items.find(find)
    --newList.total
    ++readList.total

    readList.items.push(book)
    newList.items = newList.items.filter(filter)
    readList.items = readList.items.sort((b1: Book, b2: Book) => b2.LastAccess - b1.LastAccess)
  } else {
    const book = readList.items.find(find)
    ++newList.total
    --readList.total

    newList.items.push(book)
    readList.items = readList.items.filter(filter)
    newList.items = newList.items.sort((b1: Book, b2: Book) => b2.LastModified - b1.LastModified)
  }

  proxy.writeQuery({ ...NEW_QUERY, data: { ...newData, books: newList } })
  proxy.writeQuery({ ...READ_QUERY, data: { ...readData, books: readList } })
}

export function removeBookUpdate(proxy, { data: { deleteBook } }) {
  const query = deleteBook.status ? READ_QUERY : NEW_QUERY
  const data: any = proxy.readQuery(query)
  const books = {
    ...data.books,
    total: data.books.total - 1,
    items: data.books.items.filter((b: Book) => b.id !== deleteBook.id),
  }

  proxy.writeQuery({ ...query, data: { books } })
}
