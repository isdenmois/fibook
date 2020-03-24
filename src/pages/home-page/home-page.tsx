import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router'

import HomePageStore from 'stores/HomePageStore'
import { Book } from 'models/book'
import { createBook } from 'services/book'
import { RsqlFetcher } from 'components/rsql'

import ListTab from 'components/list-tab'
import { InlineSvg } from 'components/inline-svg'
import { Loading } from 'components/loading'
import FileInput from 'components/FileInput'
import Tabs from 'components/tabs'

const fileUpload = require('./icons/file_upload.svg')
const bookIcon = require('./icons/ios-book.svg')
const bookIconOutline = require('./icons/ios-book-outline.svg')
const flagIcon = require('./icons/ios-flag.svg')
const flagIconOutline = require('./icons/ios-flag-outline.svg')
const s = require('./style/homePage.css')

interface Props extends RouteComponentProps<void> {
  fetching: boolean
  news: Book[]
  read: Book[]

  newsLoadingMore: boolean
  readLoadingMore: boolean

  newsCanLoadMore: boolean
  readCanLoadMore: boolean

  onCreateBook: (files: File[]) => void
  onLoadMore: (type: string) => void

  homePageStore: HomePageStore
}

const queries = [
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
        '(SELECT _data FROM library_thumbnail WHERE Source_MD5 = MD5) as thumbnail',
      ],
      table: 'library_metadata',
      where: '(Status = 0 OR Status IS NULL) AND (Name LIKE "%.fb2" OR Name LIKE "%.epub")',
      order: 'LastModified DESC',
      limit: 20,
    }),
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
        '(SELECT _data FROM library_thumbnail WHERE Source_MD5 = MD5) as thumbnail',
      ],
      table: 'library_metadata',
      where: 'Status = 1',
      order: 'LastAccess DESC',
      limit: 20,
    }),
  },
]

@inject('homePageStore')
@observer
export class HomePage extends React.Component<Props> {
  rsqlRef = React.createRef<RsqlFetcher>()

  componentDidMount() {
    this.rsqlRef.current.fetchData()
  }

  render() {
    return (
      <RsqlFetcher store={this.props.homePageStore} queries={queries} ref={this.rsqlRef}>
        {() => this.renderData()}
      </RsqlFetcher>
    )
  }

  renderData() {
    const { fetching } = this.props.homePageStore

    if (fetching) {
      return <Loading />
    }

    return (
      <>
        <Tabs name='home' data={this.getData()} />
        {this.props.children}
      </>
    )
  }

  getData() {
    const { news, read, newsTotal, readTotal, readLoadingMore, newsLoadingMore } = this.props.homePageStore
    const newsCanLoadMore = news.length < newsTotal
    const readCanLoadMore = read.length < readTotal

    return [
      {
        title: 'Новые',
        content: (
          <ListTab
            data={news}
            loadingMore={newsLoadingMore}
            canLoadMore={newsCanLoadMore}
            onLoadMore={this.newsLoadMore}
          />
        ),
        fixed: this.renderFixed(),
        icon: bookIcon,
        activeIcon: bookIconOutline,
      },
      {
        title: 'Прочтенные',
        content: (
          <ListTab
            data={read}
            loadingMore={readLoadingMore}
            canLoadMore={readCanLoadMore}
            onLoadMore={this.readLoadMore}
          />
        ),
        fixed: this.renderFixed(),
        icon: flagIcon,
        activeIcon: flagIconOutline,
      },
    ]
  }

  renderFixed() {
    return (
      <FileInput name='book-upload' onFileSelect={this.createBook}>
        <InlineSvg className={s.icon} src={fileUpload} />
      </FileInput>
    )
  }

  private newsLoadMore = () => {
    this.rsqlRef.current.loadMore('news')
  }

  private readLoadMore = () => {
    this.rsqlRef.current.loadMore('read')
  }

  private createBook = async (files: File[]) => {
    this.props.homePageStore.setFetching(true)
    this.props.history.replace('/')

    for (let i = 0; i < files.length; i++) {
      try {
        await createBook(files[i])
      } catch (e) {
        window.alert(e)
      }
    }

    this.rsqlRef.current.fetchData()
  }
}
