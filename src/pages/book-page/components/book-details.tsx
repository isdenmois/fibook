import * as React from 'react'

import { List } from 'components/list'
import { ListItem } from 'components/list-item'
import fileSizeConvert from 'utils/file-size'
import formatTime, { formatDaysLength } from 'utils/format-time'
import { Book, BookHistory } from 'models/book'

interface Props {
  book: Book
}

export const BookDetails = React.memo(({ book }: Props) => {
  const { author, title, progress, size, location, startRead, endRead, readTime, history } = book
  const status = book.status ? 'Прочитано' : 'Непрочитано'
  // const readTime = history?.length
  let separator = location.indexOf('/', 10)

  if (separator === -1) {
    separator = location.lastIndexOf('/')
  }

  return (
    <List strong>
      <ListItem small center='Автор' right={author} />
      <ListItem small center='Название' right={title} />
      <ListItem small center='Статус' right={status} />
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
})
