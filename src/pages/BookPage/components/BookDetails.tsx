import * as React from 'react';

import List from 'components/List'
import ListItem from 'components/ListItem'
import fileSizeConvert from 'utils/FileSize'
import formatTime, {formatDaysLength} from 'utils/formatTime'
import {Book, BookHistory} from 'models/book'

interface Props {
  book: Book
  history: BookHistory[]
}

export default class BookDetails extends React.PureComponent<Props, void> {
  render() {
    const history = this.props.history
    const {author, title, status, progress, size, location, startRead, endRead, readTime} = this.props.book
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
        {progress &&
          <ListItem center="Прогресс" right={progress}/>
        }
        {readTime &&
          <ListItem center="Время чтения" right={formatTime(readTime)}/>
        }
        {startRead &&
          <ListItem center="Начало чтения" right={new Date(startRead).toLocaleDateString()}/>
        }
        {endRead &&
          <ListItem center="Конец чтения" right={new Date(endRead).toLocaleDateString()}/>
        }
        {endRead && startRead &&
          <ListItem center="Дней чтения" right={formatDaysLength(startRead, endRead)}/>
        }
        {history.length > 0 &&
          <ListItem center="Реальных дней чтения" right={history.length}/>
        }
        <ListItem center="Размер" right={fileSizeConvert(size)}/>
        <ListItem center="Расположение" right={location.slice(0, separator)}/>
      </List>
    )
  }
}
