import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import { EventBus } from 'utils/event-bus'
import { Book } from 'models/book'
import { RsqlFetcher } from 'components/rsql'

import { FileUploaderContext } from 'components/uploader'
import ListTab from 'components/list-tab'
import { InlineSvg } from 'components/inline-svg'
import { FileInput } from 'components/file-input'
import Tabs from 'components/tabs'

const fileUpload = require('./icons/file_upload.svg')
const bookIcon = require('./icons/ios-book.svg')
const bookIconOutline = require('./icons/ios-book-outline.svg')
const flagIcon = require('./icons/ios-flag.svg')
const flagIconOutline = require('./icons/ios-flag-outline.svg')
const s = require('./style/home-page.css')

type Props = RouteComponentProps<void>

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

export class HomePage extends React.Component<Props> {
  static contextType = FileUploaderContext

  rsqlRef = React.createRef<RsqlFetcher>()

  refresh = () => this.rsqlRef.current.fetchData(false)

  componentWillUnmount = EventBus.addEventListener('refresh', this.refresh)

  render() {
    return (
      <RsqlFetcher queries={queries} ref={this.rsqlRef}>
        {(data, total, loadMore) => (
          <>
            <Tabs name='home'>{this.getTabsData(data, total, loadMore)}</Tabs>
            {this.props.children}
          </>
        )}
      </RsqlFetcher>
    )
  }

  getTabsData([news, read]: Book[][], [newsTotal, readTotal]: number[], [readLoadingMore, newsLoadingMore]: boolean[]) {
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
    this.props.history.replace('/')

    await this.context.upload(files)

    this.refresh()
  }
}
