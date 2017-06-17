import * as React from 'react'

import {container} from 'utils/container'
import BookPageContainer, {ContainerProps} from '../containers/BookPageContainer'


import Button from 'components/Button'
import Toolbar from 'components/Toolbar'
import Page from 'components/Page'
import Loading from 'components/Loading'

import BookProgress from './BookProgress'
import BookDetails from './BookDetails'
import Timeline from './Timeline'
import Thumbnail from './Thumbnail'
const s = require('./style/bookPage.css')


@container(BookPageContainer)
export default class BookPage extends React.Component<ContainerProps, void> {

  render() {
    if (this.props.fetching) {
      return (
        <Page toolbar={this.renderToolbar()}>
          <Loading />
        </Page>
      );
    }

    const {book, bookHistory, lastRead} = this.props
    return (
      <Page
        toolbar={this.renderToolbar()}
        tabbar={this.renderBottomToolbar()}
      >
        <div className={s.primary}>
          {this.props.thumbnail && <Thumbnail url={this.props.thumbnail}/>}
          <div className={s.title}>{book.title}</div>
          <div className={s.author}>{book.author}</div>
          <BookProgress lastRead={lastRead} progress={book.progress} />
        </div>
        <BookDetails book={book} />
        <Timeline history={bookHistory} />
      </Page>
    );
  }

  renderToolbar() {
    return (
      <Toolbar backButton title="Подробности"/>
    );
  }

  renderBottomToolbar() {
    const book = this.props.book

    return [
      <Button key="status" onClick={this.handleStatusChange}>
        {book.status > 0 ? 'В новые' : 'В прочтенные'}
      </Button>,
      <Button key="delete" onClick={this.props.onDeleteBook}>Удалить</Button>,
    ]
  }

  private handleStatusChange = () => {
    const status = this.props.book.status
    this.props.onStatusChange(1 - status)
  }
}
