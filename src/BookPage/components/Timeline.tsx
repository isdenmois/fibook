import * as React from 'react'
const map = require('utils/map').default
import {BookHistory} from 'models/book'

import TimeLineItem from './TimelineItem'
const s = require('./style/timeline.css')

interface Props {
  history: BookHistory[]
}

export default class Timeline extends React.PureComponent<Props, void> {

  render() {
    return (
      <div className={s.wrapper}>
        {map(this.props.history, this.renderItem)}
      </div>
    );
  }

  renderItem(item: BookHistory) {
    return (
      <div className={s.item} key={item.date}>
        <div className={s.itemDate}>{item.date}</div>
        <div className={s.divider} />
        <TimeLineItem historyItem={item}/>
      </div>
    );
  }
}
