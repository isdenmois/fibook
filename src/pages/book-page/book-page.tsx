import * as React from 'react'
import { func } from 'prop-types'
import { RouteComponentProps } from 'react-router'

import { AppContext } from 'containers/App'

import { Book, BookHistory } from 'models/book'
import { observer, inject } from 'mobx-react'
import { UPDATE } from 'services/sql'
import { deleteBook } from 'services/book'
import BookStore from 'stores/BookStore'
import { RsqlFetcher } from 'components/rsql'

import { Button } from 'components/button'
import { Toolbar } from 'components/toolbar'
import Page from 'components/page'
import { Loading } from 'components/loading'

import BookProgress from './components/BookProgress'
import BookDetails from './components/BookDetails'
import Timeline from './components/Timeline'
import Thumbnail from './components/Thumbnail'
const s = require('./style/bookPage.css')

interface BookPageParams {
  MD5: string
}

interface SharedProps extends RouteComponentProps<BookPageParams> {}

interface ContainerProps extends SharedProps {
  fetching: boolean
  book: Book
  bookHistory: BookHistory[]
  lastRead: string
  thumbnail: string

  onStatusChange: (status: number) => void
  onDeleteBook: () => void
}

interface Props extends SharedProps {
  bookStore: BookStore
}

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

@inject('bookStore')
@observer
export class BookPage extends React.Component<Props> {
  static contextTypes = {
    confirm: func,
  }

  MD5: string = null
  context: AppContext
  rsqlRef = React.createRef<RsqlFetcher>()

  componentDidMount() {
    this.loadData(this.props.match.params.MD5)
  }

  componentDidUpdate() {
    const MD5 = this.props.match.params.MD5

    if (this.MD5 !== MD5) {
      this.loadData(MD5)
    }
  }

  loadData(MD5: string) {
    this.MD5 = MD5
    this.rsqlRef.current.setVariables({ MD5 })
  }

  render() {
    const { fetching, book, history: bookHistory, lastRead, thumbnail } = this.props.bookStore

    return (
      <RsqlFetcher store={this.props.bookStore} queries={queries} ref={this.rsqlRef}>
        {() =>
          this.renderData({
            fetching: fetching || !book,
            book,
            bookHistory,
            lastRead,
            thumbnail,
          })
        }
      </RsqlFetcher>
    )
  }

  renderData({ fetching, book, bookHistory, lastRead, thumbnail }) {
    if (fetching) {
      return (
        <Page name='book' className={s.bookPage} toolbar={this.renderToolbar()}>
          <Loading />
        </Page>
      )
    }

    return (
      <Page name='book' className={s.bookPage} toolbar={this.renderToolbar()} tabbar={this.renderBottomToolbar()}>
        <div className={s.primary}>
          {thumbnail && <Thumbnail url={thumbnail} />}
          <div className={s.title}>{book.title}</div>
          <div className={s.author}>{book.author}</div>
          <BookProgress lastRead={lastRead} progress={book.progress} />
        </div>
        <BookDetails book={book} history={bookHistory} />
        <Timeline history={bookHistory} />
      </Page>
    )
  }

  renderToolbar() {
    return <Toolbar backButton history={this.props.history} title='Подробности' />
  }

  renderBottomToolbar() {
    const book = this.props.bookStore.book

    return [
      <Button key='status' onClick={this.changeStatus}>
        {book.status > 0 ? 'В новые' : 'В прочтенные'}
      </Button>,
      <Button key='delete' dangerous onClick={this.deleteBook}>
        Удалить
      </Button>,
    ]
  }

  private changeStatus = () => {
    const status = this.props.bookStore.book.status

    this.props.bookStore.changeStatus(status > 0 ? 0 : 1)
    UPDATE('library_metadata', { where: `MD5 = "${this.props.bookStore.book.MD5}"`, status })
  }

  private deleteBook = () => {
    this.context.confirm('Вы действительно хотите удалить книгу?').then(selected => {
      if (selected) {
        const MD5 = this.props.bookStore.book.MD5
        this.props.bookStore.deleteBook()
        this.props.history.push('/')
        deleteBook(MD5)
      }
    })
  }
}
