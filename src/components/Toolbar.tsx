import * as React from 'react'
import InlineSVG from './InlineSvg'

const s = require('./style/toolbar.css')
const svg = require('./style/ios-arrow-back.svg')
const close = require('./style/close.svg')

interface Props {
  title: React.ReactNode
  backButton?: boolean
  history?: any
}

export default class Toolbar extends React.PureComponent<Props> {
  render() {
    return (
      <div className={s.wrapper}>
        {this.props.backButton && (
          <div className={s.backButton} onClick={this.goBack}>
            <InlineSVG className={s.icon} src={svg} />
            Назад
          </div>
        )}
        <div className={s.title}>{this.props.title}</div>
        {this.props.backButton && (
          <div className={s.closeButton} onClick={this.goBack}>
            <InlineSVG src={close} />
          </div>
        )}
      </div>
    )
  }

  private goBack = () => {
    this.props.history.replace('/')
  }
}
