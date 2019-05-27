import * as React from 'react'
import {Link} from 'react-router-dom'

const s = require('./style/listItem.css')


interface Props {
  small?: boolean
  thumbnail?: string
  center?: React.ReactNode
  subtitle?: React.ReactNode
  right?: React.ReactNode
  onClick?: () => void
  to?: string
}

export default class ListItem extends React.PureComponent<Props> {
  render() {
    const Component = this.props.to ? Link : 'div'
    const className = this.props.small ? `${s.small} ${s.listItem}` : s.listItem

    return (
      <Component className={className} onClick={this.props.onClick} to={this.props.to}>
        {this.props.thumbnail && (
          <div className={s.left}>
            <img src={this.props.thumbnail} className={s.thumbnail}/>
          </div>
        )}
        <div className={s.center}>
          {this.props.center}
          {this.props.subtitle &&
            <div className={s.subtitle}>
              {this.props.subtitle}
            </div>
          }
        </div>
        {this.props.right &&
          <div className={s.right}>
            {this.props.right}
          </div>
        }
      </Component>
    )
  }
}

