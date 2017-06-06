import * as React from 'react';

const {List} = require('../../components/List')
const ListItem = require('../../components/List/ListItem').default
const fileSizeConvert = require('utils/FileSize').default
import {Book} from 'models/book'

interface Props {
  book: Book
}

export default class BookDetails extends React.PureComponent<Props, void> {
  render() {
    const {author, title, status, progress, size} = this.props.book
    const Status = status ? 'Прочитано' : 'Непрочитано';

    return (
      <List>
        <ListItem center="Автор" right={author}/>
        <ListItem center="Название" right={title}/>
        <ListItem center="Статус" right={Status}/>
        <ListItem center="Прогресс" right={progress}/>
        <ListItem center="Размер" right={fileSizeConvert(size)}/>
      </List>
    )
  }
}