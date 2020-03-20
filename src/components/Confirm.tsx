import * as React from 'react'

import { Modal } from './modal'

interface Props {}

interface State {
  buttons: string[]
  text: string
  positive: boolean
}

export default class Confirm extends React.PureComponent<Props> {
  state: State = {
    buttons: [],
    text: '',
    positive: false,
  }

  private toSelect: (n: number) => void

  render() {
    const { buttons, text, positive } = this.state
    return (
      <Modal buttons={buttons} open={!!text} onSelect={this.toSelect} positive={positive}>
        {text}
      </Modal>
    )
  }

  toConfirm(text: string, buttons: string[]): Promise<number> {
    return new Promise(resolve => {
      this.toSelect = n => {
        this.setState({ text: '', buttons: [], positive: n })
        resolve(n)
      }

      this.setState({ text, buttons })
    })
  }
}
