import * as React from 'react'
import {Book} from 'models/book'
import Spinner from './Spinner'

const {List, ListItem} = require('components/List')
const EmptyList = require('./EmptyList').default
const s = require('./style/listTab.css')


interface Props {
  data: Book[]
  canLoadMore?: boolean
  loadingMore?: boolean
  onLoadMore?: () => void
}

export default class ListTab extends React.PureComponent<Props, void> {
  constructor(props: Props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  render() {
    const {data, onLoadMore, loadingMore, canLoadMore} = this.props

    if (data.length === 0) {
      return <EmptyList />
    }

    return (
      <List>
        {data.map(this.renderRow)}
        {loadingMore &&
          <div className={s.spinner}><Spinner/></div>
        }
        {canLoadMore && !loadingMore &&
          <div className={s.loadMore} onClick={onLoadMore}>Загрузить еще</div>
        }
      </List>
    )
  }

  private renderRow(book: Book) {
    const MD5 = book.MD5
    const title = book.title
    const author = book.author

    return (
      <ListItem
        center={title}
        subtitle={author}
        to={`/book/${MD5}`}
        key={MD5}
      />
    )
  }
}
