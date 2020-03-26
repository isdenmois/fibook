import * as React from 'react'

const { emptyList } = require('./style/empty-list.css')

export function EmptyList() {
  return <div className={emptyList}>Книг в разделе нет</div>
}
