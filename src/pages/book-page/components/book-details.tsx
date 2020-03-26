import * as React from 'react'

import { List } from 'components/list'
import { ListItem } from 'components/list-item'
import fileSizeConvert from 'utils/file-size'
import formatTime, { formatDaysLength } from 'utils/format-time'
import { Book, BookHistory } from 'models/book'

interface Props {
  book: Book
  history: BookHistory[]
}

export default class BookDetails extends React.PureComponent<Props> {
  render() {
    const history = this.props.history
    const { author, title, status, progress, size, location, startRead, endRead, readTime } = this.props.book
    const Status = status ? 'Прочитано' : 'Непрочитано'
    let separator = location.indexOf('/', 10)
    if (separator === -1) {
      separator = location.lastIndexOf('/')
    }

    return (
      <List strong>
        <ListItem small center='Автор' right={author} />
        <ListItem small center='Название' right={title} />
        <ListItem small center='Статус' right={Status} />
        {progress && <ListItem small center='Прогресс' right={progress} />}
        {readTime && <ListItem small center='Время чтения' right={formatTime(readTime)} />}
        {startRead && <ListItem small center='Начало чтения' right={new Date(startRead).toLocaleDateString()} />}
        {endRead && <ListItem small center='Конец чтения' right={new Date(endRead).toLocaleDateString()} />}
        {endRead && startRead && <ListItem small center='Дней чтения' right={formatDaysLength(startRead, endRead)} />}
        {history.length > 0 && <ListItem small center='Реальных дней чтения' right={history.length} />}
        <ListItem small center='Размер' right={fileSizeConvert(size)} />
        <ListItem small center='Расположение' right={location.slice(0, separator)} />
      </List>
    )
  }
}
