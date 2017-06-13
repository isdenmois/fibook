import * as React from 'react'

const InlineSVG = require('svg-inline-react')
const svg = require('./style/bookProgress.svg')
const s = require('./style/bookProgress.css')


interface Props {
  progress: string
  lastRead: string
}

export default class BookProgress extends React.PureComponent<Props, void> {

  render() {
    const progress = this.props.progress || '0/1'
    const parts = progress.split('/')
    const position = +parts[0]
    const total = +parts[1]

    if (position > 0 && total - position < 5) {
      return (
        <div className={s.read}>
          Прочитано {this.props.lastRead}
        </div>
      );
    }
    const percent = (position / total) * 100 - 100

    return (
      <div className={s.progress}>
        <InlineSVG className={s.wrapper} src={svg} style={{ left: `${percent}%` }} />
      </div>
    );
  }
}
