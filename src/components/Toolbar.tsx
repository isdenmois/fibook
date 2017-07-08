import * as React from 'react'
const InlineSVG = require('svg-inline-react')

const s = require('./style/toolbar.css')
const svg = require('./style/ios-arrow-back.svg')

interface Props {
  title: React.ReactNode
  backButton?: boolean
}

export default class Toolbar extends React.PureComponent<Props> {

  static contextTypes = {
    router: (): any => null
  }

  render() {
    return (
      <div className={s.wrapper}>
        {this.props.backButton &&
          <div className={s.backButton} onClick={this.goBack}>
            <InlineSVG className={s.icon} src={svg}/>
            Назад
          </div>
        }
        <div className={s.title}>{this.props.title}</div>
      </div>
    )
  }

  private goBack = () => {
    this.context.router.history.push('/')
  }
}
