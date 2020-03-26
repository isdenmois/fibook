import * as React from 'react'
import map from 'utils/map'
import { BookHistory } from 'models/book'

import TimeLineItem from './time-line-item'
const s = require('../style/timeline.css')

interface Props {
  history: BookHistory[]
}

export default class Timeline extends React.PureComponent<Props> {
  render() {
    return <div className={s.wrapper}>{map(this.props.history, this.renderItem)}</div>
  }

  renderItem(item: BookHistory) {
    return (
      <div className={s.item} key={item.date}>
        <div className={s.itemDate}>{item.date}</div>
        <div className={s.divider} />
        <TimeLineItem historyItem={item} />
      </div>
    )
  }
}
