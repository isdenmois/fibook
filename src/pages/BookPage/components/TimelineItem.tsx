import * as React from 'react'
const formatTime = require('utils/formatTime').default
import { BookHistory } from 'models/book'
const s = require('./style/timelineItem.css')

interface Props {
  historyItem: BookHistory
}

export default class TimelineItem extends React.PureComponent<Props> {
  render() {
    const { progress, percent, pages, speed, time } = this.props.historyItem

    return (
      <div className={s.content}>
        <div className={s.row}>
          {progress} ({percent}%)
        </div>
        <div className={s.row}>
          <span>Страниц</span>
          <span>{pages}</span>
        </div>
        <div className={s.row}>
          <span>Скорость</span>
          <span>{speed}</span>
        </div>
        <div className={s.row}>
          <span>Время</span>
          <span>{formatTime(time)}</span>
        </div>
      </div>
    )
  }
}
