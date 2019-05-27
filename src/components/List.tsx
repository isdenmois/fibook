import * as React from 'react'

const s = require('./style/list.css')

interface Props {
  empty?: JSX.Element
  strong?: boolean
}

export default class List extends React.PureComponent<Props> {
  render() {
    if (!this.props.children) {
      return this.props.empty
    }

    const className = this.props.strong ? `${s.list} ${s.strong}` : s.list

    return (
      <div className={className}>
        {this.props.children}
      </div>
    )
  }
}
