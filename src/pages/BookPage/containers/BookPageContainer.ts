import * as React from 'react'
import {func} from 'prop-types'
import {RouteComponentProps} from 'react-router'

import {renderView, ContainerBaseProps} from 'utils/container'
import {rsqlContainer, RSQLProps} from 'utils/rsql'
import {AppContext} from 'containers/App'

import {Book, BookHistory} from 'models/book'
import {observer} from 'mobx-react'
import {UPDATE} from 'services/sql'
import {deleteBook} from 'services/book'
import BookStore from 'stores/BookStore'


interface BookPageParams {
  MD5: string
}

interface SharedProps extends RouteComponentProps<BookPageParams> {
}

export interface ContainerProps extends SharedProps {
  fetching: boolean
  book: Book
  bookHistory: BookHistory[]
  lastRead: string
  thumbnail: string

  onStatusChange: (status: number) => void
  onDeleteBook: () => void
}

interface Props extends ContainerBaseProps, SharedProps {
  rsql: RSQLProps
  bookStore: BookStore
}

@rsqlContainer({
  queries: [
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
        fields: [
          'StartTime as date',
          'EndTime',
          '(EndTime - StartTime) AS time',
          'Progress AS progress',
        ],
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
  ],
  initialVariables: {},
  store: 'bookStore'
})
@observer
export default class BookPageContainer extends React.Component<Props> {

  static contextTypes = {
    confirm: func
  }

  MD5: string = null
  context: AppContext

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
    this.props.rsql.setVariables({MD5})
  }

  render() {
    const {fetching, book, history: bookHistory, lastRead, thumbnail} = this.props.bookStore
    return renderView(this.props, {
      fetching: fetching || !book,
      book, bookHistory, lastRead, thumbnail,
      onStatusChange: this.handleChangeStatus,
      onDeleteBook: this.handleDeleteBook,
    })
  }

  private handleChangeStatus = (status: number) => {
    this.props.bookStore.changeStatus(status)
    UPDATE('library_metadata', {where: `MD5 = "${this.props.bookStore.book.MD5}"`, status})
  }

  private handleDeleteBook = () => {
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
