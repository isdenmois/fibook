import * as React from 'react'

const s = require('./style/listHeader.css')


interface Props {}

export default class ListHeader extends React.PureComponent<Props, void> {
  render() {
    return (
      <div className={s.header}>
        {this.props.children}
      </div>
    )
  }
}
