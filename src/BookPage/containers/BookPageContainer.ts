import * as React from 'react'
import {RouteComponentProps} from "react-router"

import {renderView, ContainerBaseProps} from 'utils/container'
import {fetchContainer, FetchProps} from 'utils/fetch'
import {Book, BookHistory} from 'models/book'
import {observer} from 'mobx-react'
import {UPDATE} from 'utils/rsql'
import BookStore from 'stores/BookStore'


interface BookPageParams {
  MD5: string
}

export interface ContainerProps {
  fetching: boolean
  book: Book
  history: BookHistory[]
  lastRead: string

  onStatusChange: (status: number) => void
}

interface Props extends ContainerBaseProps, RouteComponentProps<BookPageParams> {
  fetch: FetchProps
  bookStore: BookStore
}

@fetchContainer({
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
  ],
  initialVariables: {},
  store: 'bookStore'
})
@observer
export default class BookPageContainer extends React.Component<Props, void> {

  componentWillMount() {
    const MD5 = this.props.match.params.MD5
    this.props.fetch.setVariables({MD5})
  }

  render() {
    const {fetching, book, history, lastRead} = this.props.bookStore
    return renderView(this.props, {
      fetching: fetching || !book,
      book, history, lastRead,
      onStatusChange: this.handleChangeStatus,
    })
  }

  private handleChangeStatus = (status: number) => {
    this.props.bookStore.changeStatus(status)
    UPDATE('library_metadata', {where: `MD5 = "${this.props.bookStore.book.MD5}"`, status})
  }
}
