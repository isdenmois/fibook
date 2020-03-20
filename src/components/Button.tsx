import * as React from 'react'

const s = require('./style/button.css')

interface Props {
  dangerous?: boolean
  positive?: boolean
  onClick: () => void
}

export default class Button extends React.PureComponent<Props> {
  render() {
    let className = s.wrapper

    const { children, dangerous, positive, ...props } = this.props

    if (dangerous) {
      className = `${className} ${s.dangerous}`
    }

    if (positive) {
      className = `${className} ${s.positive}`
    }

    return (
      <div {...props} className={className}>
        {children}
      </div>
    )
  }
}
