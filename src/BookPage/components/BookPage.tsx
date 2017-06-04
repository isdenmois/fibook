import * as React from 'react'

import {container} from 'utils/container'
import BookPageContainer, {ContainerProps} from 'BookPage/containers/BookPageContainer'


const Button = require('components/Button').default
const Toolbar = require('components/Toolbar').default
const Page = require('components/Page').default
const Loading = require('components/Loading').default

import BookProgress from './BookProgress'
import BookDetails from './BookDetails'
import Timeline from './Timeline'
const s = require('./style/bookPage.css')


@container(BookPageContainer)
export default class BookPage extends React.Component<ContainerProps, void> {

  render() {
    if (this.props.fetching || !this.props.book) {
      return (
        <Page toolbar={this.renderToolbar()}>
          <Loading />
        </Page>
      );
    }


    const book = this.props.book
    return (
      <Page
        toolbar={this.renderToolbar()}
        tabbar={this.renderBottomToolbar()}
        bottomToolbar={this.renderBottomToolbar}
      >
        <div className={s.primary}>
          <div className={s.title}>{book.title}</div>
          <div className={s.author}>{book.author}</div>
          <BookProgress lastRead={book.lastRead} progress={book.progress} />
        </div>
        <BookDetails book={book} />
        <Timeline history={book.history} />
      </Page>
    );
  }

  renderToolbar() {
    return (
      <Toolbar backButton title="Подробности" />
    );
  }

  renderBottomToolbar() {
    const book = this.props.book;

    return [
      <Button key="status">{book.status ? 'В новые' : 'В прочтенные'}</Button>,
      <Button key="delete">Удалить</Button>,
    ];
  }
}
