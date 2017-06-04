import * as React from 'react'
import {RouteComponentProps} from "react-router"

import {renderView, ContainerBaseProps} from 'utils/container'
import {fetchContainer, FetchProps} from 'utils/fetch'
import {Book} from 'models/book'
const processHistory = require('utils/processHistory').default


interface BookPageParams {
  MD5: string
}

interface SharedProps {
  book: Book
}

export interface ContainerProps extends SharedProps {
  fetching: boolean
}

interface Props extends SharedProps, ContainerBaseProps, RouteComponentProps<BookPageParams> {
  fetch: FetchProps
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
  mapFetchToProps,
})
export default class BookPageContainer extends React.Component<Props, void> {

  componentWillMount() {
    const MD5 = this.props.match.params.MD5
    this.props.fetch.setVariables({MD5})
  }

  render() {
    return renderView(this.props, {
      fetching: this.props.fetch.fetching,
    })
  }
}

function mapFetchToProps(data: any) {
  const history = processHistory(data.history || [])
  const book = data.book[0] || {}
  if (history.length) {
    book.lastRead = history[history.length - 1].date
  }
  book.history = history

  return {book}
}
