import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import { Book, BookHistory } from 'models/book'
import { UPDATE } from 'services/sql'
import { deleteBook } from 'services/book'
import { RsqlFetcher } from 'components/rsql'
import processHistory from 'utils/process-history'
import { minBy, maxBy } from 'utils/min-by'
import { EventBus } from 'utils/event-bus'

import { ConfirmContext } from 'components/confirm'
import { Button } from 'components/button'
import { Toolbar } from 'components/toolbar'
import Page from 'components/page'
import { Loading } from 'components/loading'

import { BookProgress } from './components/book-progress'
import BookDetails from './components/book-details'
import Timeline from './components/timeline'
import Thumbnail from './components/thumbnail'
const s = require('./style/book-page.css')

interface BookPageParams {
  MD5: string
}

type Props = RouteComponentProps<BookPageParams>

const queries = [
  {
    prop: 'book',
    query: (vars: any) => ({
      fields: [
        'MD5',
        'Authors AS author',
        'Title AS title',
        'Progress AS progress',
        'Status AS status',
        'Size AS size',
        'Location as location',
      ],
      table: 'library_metadata',
      where: `MD5 = "${vars.MD5}"`,
    }),
  },
  {
    prop: 'history',
    query: (vars: any) => ({
      fields: ['StartTime as date', 'EndTime', '(EndTime - StartTime) AS time', 'Progress AS progress'],
      table: 'library_history',
      where: `MD5 = "${vars.MD5}" AND time > 30000 AND progress <>  "5/5"`,
      order: 'StartTime',
      limit: -1,
    }),
  },
  {
    prop: 'thumbnail',
    query: (vars: any) => ({
      fields: ['_data AS url'],
      table: 'library_thumbnail',
      where: `Source_MD5 = "${vars.MD5}"`,
      limit: 1,
    }),
  },
]

export class BookPage extends React.Component<Props> {
  static contextType = ConfirmContext

  state = { MD5: this.props.match.params.MD5 }

  MD5: string = null
  rsqlRef = React.createRef<RsqlFetcher>()

  componentDidUpdate() {
    const MD5 = this.props.match.params.MD5

    if (this.state.MD5 !== MD5) {
      this.setState({ MD5 })
    }
  }

  render() {
    const toolbar = <Toolbar backButton history={this.props.history} title='Подробности' />
    const loading = (
      <Page name='book' className={s.bookPage} toolbar={toolbar}>
        <Loading />
      </Page>
    )

    return (
      <RsqlFetcher variables={this.state} queries={queries} loading={loading} mapData={this.mapData} ref={this.rsqlRef}>
        {([book, history, thumbnail, lastRead]) => (
          <Page name='book' className={s.bookPage} toolbar={toolbar} tabbar={this.renderBottomToolbar(book)}>
            <div className={s.primary}>
              {thumbnail && <Thumbnail url={thumbnail} />}
              <div className={s.title}>{book.title}</div>
              <div className={s.author}>{book.author}</div>

              <BookProgress status={book.status} lastRead={lastRead} progress={book.progress} />
            </div>
            <BookDetails book={book} history={history} />
            <Timeline history={history} />
          </Page>
        )}
      </RsqlFetcher>
    )
  }

  renderBottomToolbar(book: Book) {
    return book
      ? [
          <Button key='status' onClick={this.changeStatus}>
            {book.status > 0 ? 'В новые' : 'В прочтенные'}
          </Button>,
          <Button key='delete' dangerous onClick={this.deleteBook}>
            Удалить
          </Button>,
        ]
      : null
  }

  private mapData([book, history, thumbnail]) {
    const processedHistory = processHistory(history || [])

    book = book[0]
    book.status = +book.status

    if (processedHistory.length > 0) {
      book.startRead = +minBy(history, 'date')
      book.endRead = +maxBy(history, 'EndTime')
      book.readTime = processedHistory.reduce((time: number, item: BookHistory) => time + item.time, 0)
    }

    const lastRead = processedHistory.length > 0 ? processedHistory[processedHistory.length - 1].date : ''

    return [book, processedHistory, thumbnail?.[0]?.url, lastRead]
  }

  private changeStatus = async () => {
    const book: Book = this.rsqlRef.current.getData('book')
    const status = book.status > 0 ? 0 : 1

    this.rsqlRef.current.updateData('book', { ...book, status })

    await UPDATE('library_metadata', { where: `MD5 = "${book.MD5}"`, status })

    EventBus.dispatch('refresh')
  }

  private deleteBook = () => {
    this.context.confirm('Вы действительно хотите удалить книгу?').then(async selected => {
      if (selected) {
        const book: Book = this.rsqlRef.current.getData('book')

        this.props.history.push('/')

        await deleteBook(book.MD5)

        EventBus.dispatch('refresh')
      }
    })
  }
}
