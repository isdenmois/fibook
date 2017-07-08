import * as React from 'react'

const s = require('./style/button.css')


interface Props {
  onClick: () => void
}

export default class Button extends React.PureComponent<Props> {

  render() {
    return (
      <div {...this.props} className={s.wrapper}>
        {this.props.children}
      </div>
    )
  }
}
