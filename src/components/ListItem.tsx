import * as React from 'react'
import {Link} from 'react-router-dom'

const s = require('./style/listItem.css')


interface Props {
  center?: React.ReactNode
  subtitle?: React.ReactNode
  right?: React.ReactNode
  onClick?: () => void
  to?: string
}

export default class ListItem extends React.PureComponent<Props, void> {
  render() {
    const Component = this.props.to ? Link : 'div'

    return (
      <Component className={s.listItem} onClick={this.props.onClick} to={this.props.to}>
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

