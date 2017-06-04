import * as React from 'react'
import {observer} from 'mobx-react'

import {renderView, ContainerBaseProps} from 'utils/container'
import {FetchProps, fetchContainer} from 'utils/fetch'
import {RouteComponentProps} from 'react-router'
import HomePageStore from 'stores/HomePageStore'
import {Book} from 'models/book'
import {createBook} from 'services/book'


export interface ContainerProps {
  fetching: boolean
  news: Book[]
  read: Book[]

  onCreateBook: (file: File) => void
}

interface Props extends ContainerBaseProps, RouteComponentProps<void> {
  fetch: FetchProps
  homePageStore: HomePageStore
}

@fetchContainer({
  queries: [
    {
      prop: 'news',
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
        where: 'Status = 0 OR Status IS NULL',
        order: 'LastModified DESC',
        limit: 50,
      })
    },
    {
      prop: 'read',
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
        limit: 50,
      })
    },
  ],
  initialVariables: {},
  store: 'homePageStore'
})
@observer
export default class HomePageContainer extends React.Component<Props, void> {

  componentWillMount() {
    this.props.fetch.fetchData()
  }

  render() {
    const {homePageStore} = this.props

    return renderView(this.props, {
      fetching: homePageStore.fetching,
      news: homePageStore.news,
      read: homePageStore.read,
      onCreateBook: this.handleCreateBook,
    })
  }

  private handleCreateBook = async (file: File) => {
    this.props.homePageStore.setFetching(true)
    await createBook(file)
    this.props.fetch.fetchData()
  }
}
