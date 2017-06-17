import * as React from 'react'
import {RouteComponentProps} from "react-router"

import {renderView, ContainerBaseProps} from 'utils/container'
import {rsqlContainer, RSQLProps} from 'utils/rsql'
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
export default class BookPageContainer extends React.Component<Props, void> {

  componentWillMount() {
    const MD5 = this.props.match.params.MD5
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
    if (confirm('Вы действительно хотите удалить книгу?')) {
      const MD5 = this.props.bookStore.book.MD5
      this.props.bookStore.deleteBook()
      this.props.history.push('/')
      deleteBook(MD5)
    }
  }
}
