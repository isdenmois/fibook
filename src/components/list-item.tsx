import * as React from 'react'
import { Link } from 'react-router-dom'

const s = require('./style/list-item.css')

interface Props {
  small?: boolean
  thumbnail?: string
  center?: React.ReactNode
  subtitle?: React.ReactNode
  right?: React.ReactNode
  onClick?: () => void
  to?: string
}

export const ListItem = React.memo((props: Props) => {
  const Component = props.to ? Link : 'div'
  const className = props.small ? `${s.small} ${s.listItem}` : s.listItem

  return (
    <Component className={className} onClick={props.onClick} to={props.to}>
      {props.thumbnail && (
        <div className={s.left}>
          <img src={props.thumbnail} className={s.thumbnail} />
        </div>
      )}
      <div className={s.center}>
        {props.center}
        {props.subtitle && <div className={s.subtitle}>{props.subtitle}</div>}
      </div>
      {props.right && <div className={s.right}>{props.right}</div>}
    </Component>
  )
})
