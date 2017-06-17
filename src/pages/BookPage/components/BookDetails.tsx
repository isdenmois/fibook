import * as React from 'react';

import List from 'components/List'
import ListItem from 'components/ListItem'
import fileSizeConvert from 'utils/FileSize'
import {Book} from 'models/book'

interface Props {
  book: Book
}

export default class BookDetails extends React.PureComponent<Props, void> {
  render() {
    const {author, title, status, progress, size, location} = this.props.book
    const Status = status ? 'Прочитано' : 'Непрочитано';
    let separator = location.indexOf('/', 10)
    if (separator === -1) {
      separator = location.lastIndexOf('/')
    }

    return (
      <List>
        <ListItem center="Автор" right={author}/>
        <ListItem center="Название" right={title}/>
        <ListItem center="Статус" right={Status}/>
        <ListItem center="Прогресс" right={progress}/>
        <ListItem center="Размер" right={fileSizeConvert(size)}/>
        <ListItem center="Расположение" right={location.slice(0, separator)}/>
      </List>
    )
  }
}
