import * as React from 'react'

import { container } from 'utils/container'
import BookPageContainer, { ContainerProps } from '../containers/BookPageContainer'

import { Button } from 'components/button'
import { Toolbar } from 'components/toolbar'
import Page from 'components/page'
import { Loading } from 'components/loading'

import BookProgress from './BookProgress'
import BookDetails from './BookDetails'
import Timeline from './Timeline'
import Thumbnail from './Thumbnail'
const s = require('./style/bookPage.css')

@container(BookPageContainer)
export class BookPage extends React.Component<ContainerProps> {
  render() {
    if (this.props.fetching) {
      return (
        <Page name='book' className={s.bookPage} toolbar={this.renderToolbar()}>
          <Loading />
        </Page>
      )
    }

    const { book, bookHistory, lastRead } = this.props
    return (
      <Page name='book' className={s.bookPage} toolbar={this.renderToolbar()} tabbar={this.renderBottomToolbar()}>
        <div className={s.primary}>
          {this.props.thumbnail && <Thumbnail url={this.props.thumbnail} />}
          <div className={s.title}>{book.title}</div>
          <div className={s.author}>{book.author}</div>
          <BookProgress lastRead={lastRead} progress={book.progress} />
        </div>
        <BookDetails book={book} history={bookHistory} />
        <Timeline history={bookHistory} />
      </Page>
    )
  }

  renderToolbar() {
    return <Toolbar backButton history={this.props.history} title='Подробности' />
  }

  renderBottomToolbar() {
    const book = this.props.book

    return [
      <Button key='status' onClick={this.handleStatusChange}>
        {book.status > 0 ? 'В новые' : 'В прочтенные'}
      </Button>,
      <Button key='delete' dangerous onClick={this.props.onDeleteBook}>
        Удалить
      </Button>,
    ]
  }

  private handleStatusChange = () => {
    const status = this.props.book.status
    this.props.onStatusChange(status > 0 ? 0 : 1)
  }
}
