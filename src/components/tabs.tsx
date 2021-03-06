import * as React from 'react'
import { InlineSvg } from './inline-svg'
import map from 'utils/map'
import Page from './page'

const s = require('./style/tabs.css')

interface Props {
  children: TabData[]
  name: string
}

interface State {
  active: number
}

export default class Tabs extends React.PureComponent<Props> {
  state: State = { active: 0 }
  private tabs: HTMLElement[] = []

  render() {
    const active = this.state.active
    const tab = this.props.children[active]

    return (
      <Page
        shadow
        tabsTop
        name={this.props.name}
        tabbar={map(this.props.children, this.renderButton)}
        fixed={tab.fixed}
      >
        {map(this.props.children, this.renderTab)}
      </Page>
    )
  }

  private renderTab = (data: TabData, i: number) => {
    return (
      <div key={i} ref={tab => (this.tabs[i] = tab)} className={this.getClassName(i)}>
        {data.content}
      </div>
    )
  }

  private renderButton = (data: TabData, i: number): React.ReactNode => {
    const active = this.state.active
    let icon = data.icon
    if (active && data.activeIcon) {
      icon = data.activeIcon
    }

    return (
      <div key={i} onClick={() => this.setActive(i)} className={i === active ? s.buttonActive : s.button}>
        <InlineSvg className={s.icon} src={icon} />
        {data.title}
      </div>
    )
  }

  private getClassName(i: number) {
    const active = this.state.active
    if (i < active) {
      return s.tabLeft
    }
    if (i > active) {
      return s.tabRight
    }

    return s.tabActive
  }

  private setActive(active: number) {
    this.tabs[this.state.active].scrollTop = 0
    this.setState({ active })
  }
}

export interface TabData {
  title: string
  content: React.ReactNode
  icon: any
  activeIcon: any
  fixed?: React.ReactNode
}
