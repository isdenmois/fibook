import * as React from 'react'

import Modal from './Modal'


interface Props {}

interface State {
  buttons: string[]
  text: string
}

export default class Confirm extends React.PureComponent<Props, State> {

  state: State = {
    buttons: [],
    text: '',
  }

  private toSelect: (n: number) => void

  render() {
    return (
      <Modal buttons={this.state.buttons} open={!!this.state.text} onSelect={this.toSelect}>
        {this.state.text}
      </Modal>
    )
  }

  toConfirm(text: string, buttons: string[]): Promise<number> {
    return new Promise((resolve) => {
      this.toSelect = n => {
        this.setState({text: '', buttons: []})
        resolve(n)
      }

      this.setState({text, buttons})
    })
  }
}
