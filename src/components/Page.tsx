import * as React from 'react'
import map from 'utils/map'

const s = require('./style/page.css')

interface Props {
  tabbar?: React.ReactNode
  toolbar?: React.ReactNode
  className?: string
  fixed?: React.ReactNode
  tabs?: TabData[]
}

interface State {
  tab: number
}

export default class Page extends React.PureComponent<Props, State> {

  state: State = {tab: 0}

  render() {
    let className = s.page
    if (this.props.tabbar) {
      className = `${className} tabbar`
    }
    if (this.props.toolbar) {
      className = `${className} toolbar`
    }
    if (this.props.className) {
      className = `${className} ${this.props.className}`
    }

    return (
      <div className={className}>
        {this.props.fixed}
        {this.props.toolbar &&
          <div className={s.toolbar}>{this.props.toolbar}</div>
        }
        <div className={s.content}>{this.props.children}</div>
        {this.props.tabs &&
          <div className={s.tabs}>
            {map(this.props.tabs, this.renderTabButton)}
          </div>
        }
        {this.props.tabbar &&
          <div className={s.tabs}>{this.props.tabbar}</div>
        }
      </div>
    )
  }

  private renderTabButton = (data: TabData, index: number) => {
    let className = s.tab
    if (this.state.tab === index) {
      className = `${s.tab} ${s.tabSelected}`
    }

    return (
      <div key={index} className={className} data-index={index} onClick={this.handleClick}>
        {data.label}
      </div>
    )
  }

  private handleClick = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({tab: +event.currentTarget.dataset.index})
  }
}

interface TabData {
  label: string
}

