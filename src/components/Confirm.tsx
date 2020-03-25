import * as React from 'react'

import { Modal } from './modal'

interface Props {}

interface State {
  buttons: string[]
  text: string
  positive: boolean
}

export interface ConfirmProvider {
  confirm: (text: string, buttons?: string[]) => Promise<number>
}

export const ConfirmContext = React.createContext<ConfirmProvider>(null)

export class Confirm extends React.PureComponent<Props> {
  state: State = {
    buttons: [],
    text: '',
    positive: false,
  }

  private toSelect: (n: number) => void
  private provider = {
    confirm: (text: string, buttons: string[] = ['Отмена', 'ОК']): Promise<number> => {
      this.setState({ text, buttons })

      return new Promise(resolve => {
        this.toSelect = n => {
          this.setState({ text: '', buttons: [], positive: n })
          resolve(n)
        }
      })
    },
  }

  render() {
    const { buttons, text, positive } = this.state

    return (
      <ConfirmContext.Provider value={this.provider}>
        <Modal buttons={buttons} open={!!text} onSelect={this.toSelect} positive={positive}>
          {text}
        </Modal>

        {this.props.children}
      </ConfirmContext.Provider>
    )
  }
}
