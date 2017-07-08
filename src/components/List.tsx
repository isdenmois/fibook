import * as React from 'react'

const s = require('./style/list.css')

interface Props {
  empty?: JSX.Element
}

export default class List extends React.PureComponent<Props> {
  render() {
    if (!this.props.children) {
      return this.props.empty
    }

    return (
      <div className={s.list}>
        {this.props.children}
      </div>
    )
  }
}
