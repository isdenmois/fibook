import * as React from 'react'
import { Book } from 'models/book'
import Spinner from './Spinner'

import List from './List'
import ListItem from './ListItem'
import EmptyList from './EmptyList'
const s = require('./style/listTab.css')

interface Props {
  data: Book[]
  canLoadMore?: boolean
  loadingMore?: boolean
  onLoadMore?: () => void
}

export default class ListTab extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  render() {
    const { data, onLoadMore, loadingMore, canLoadMore } = this.props

    if (data.length === 0) {
      return <EmptyList />
    }

    return (
      <List>
        {data.map(this.renderRow)}
        {loadingMore && (
          <div className={s.spinner}>
            <Spinner />
          </div>
        )}
        {canLoadMore && !loadingMore && (
          <div className={s.loadMore} onClick={onLoadMore}>
            Загрузить еще
          </div>
        )}
      </List>
    )
  }

  private renderRow(book: Book) {
    const { MD5, title, author } = book
    let thumbnail = book.thumbnail ? `/thumbnail/${book.thumbnail}` : null

    return <ListItem thumbnail={thumbnail} center={title} subtitle={author} to={`/book/${MD5}`} key={MD5} />
  }
}
