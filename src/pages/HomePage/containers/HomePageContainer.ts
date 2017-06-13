import * as React from 'react'
import {observer} from 'mobx-react'
import {RouteComponentProps} from 'react-router'

import {renderView, ContainerBaseProps} from 'utils/container'
import {RSQLProps, rsqlContainer} from 'utils/rsql'
import HomePageStore from 'stores/HomePageStore'
import {Book} from 'models/book'
import {createBook} from 'services/book'


interface SharedProps extends RouteComponentProps<void> {

}

export interface ContainerProps extends SharedProps {
  fetching: boolean
  news: Book[]
  read: Book[]

  newsLoadingMore: boolean
  readLoadingMore: boolean

  newsCanLoadMore: boolean
  readCanLoadMore: boolean

  onCreateBook: (file: File) => void
  onLoadMore: (type: string) => void
}

interface Props extends ContainerBaseProps, SharedProps {
  rsql: RSQLProps
  homePageStore: HomePageStore
}

@rsqlContainer({
  queries: [
    {
      prop: 'news',
      pagination: true,
      query: () => ({
        fields: [
          'MD5',
          'Authors AS author',
          'Title AS title',
          'ifnull(Status, 0) AS status',
          'LastAccess',
          'LastModified',
        ],
        table: 'library_metadata',
        where: '(Status = 0 OR Status IS NULL) AND (Name LIKE "%.fb2" OR Name LIKE "%.epub")',
        order: 'LastModified DESC',
        limit: 20,
      })
    },
    {
      prop: 'read',
      pagination: true,
      query: () => ({
        fields: [
          'MD5',
          'Authors AS author',
          'Title AS title',
          'Status AS status',
          'LastAccess',
          'LastModified',
        ],
        table: 'library_metadata',
        where: 'Status = 1',
        order: 'LastAccess DESC',
        limit: 20,
      })
    },
  ],
  initialVariables: {},
  store: 'homePageStore'
})
@observer
export default class HomePageContainer extends React.Component<Props, void> {

  componentWillMount() {
    this.props.rsql.fetchData()
  }

  render() {
    const {homePageStore} = this.props
    const {news, read, newsTotal, readTotal, readLoadingMore, newsLoadingMore} = homePageStore

    return renderView(this.props, {
      fetching: homePageStore.fetching,
      newsCanLoadMore: news.length < newsTotal,
      readCanLoadMore: read.length < readTotal,
      onCreateBook: this.handleCreateBook,
      onLoadMore: this.handleLoadMore,
      newsLoadingMore,
      readLoadingMore,
      news,
      read,
    })
  }

  private handleCreateBook = async (file: File) => {
    this.props.homePageStore.setFetching(true)
    await createBook(file)
    this.props.rsql.fetchData()
  }

  private handleLoadMore = (type: string) => {
    this.props.rsql.loadMore(type)
  }
}
