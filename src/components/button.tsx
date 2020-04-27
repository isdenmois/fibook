import * as React from 'react'

const s = require('./style/button.css')

interface Props {
  dangerous?: boolean
  positive?: boolean
  onClick: () => void
  children?: React.ReactNode
}

export const Button = (props: Props) => {
  let className = s.wrapper

  const { children, dangerous, positive, ...otherProps } = props

  if (dangerous) {
    className = `${className} ${s.dangerous}`
  }

  if (positive) {
    className = `${className} ${s.positive}`
  }

  return (
    <div {...otherProps} className={className}>
      {children}
    </div>
  )
}
