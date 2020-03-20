import * as React from 'react'

const s = require('./style/list.css')

interface Props {
  empty?: JSX.Element
  strong?: boolean
  children?: React.ReactNode
}

export const List = React.memo((props: Props) => {
  if (!props.children) {
    return props.empty
  }

  const className = props.strong ? `${s.list} ${s.strong}` : s.list

  return <div className={className}>{props.children}</div>
})
