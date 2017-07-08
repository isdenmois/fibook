import * as React from 'react'
import {func} from 'prop-types'

import Confirm from 'components/Confirm'

interface Props {}

export interface AppContext {
  confirm: (text: string, buttons?: string[]) => Promise<number>;
}

export default class App extends React.Component<Props> {

  static childContextTypes = {
    confirm: func,
  }

  private confirm: Confirm

  getChildContext(): AppContext {
    return {
      confirm: this.handleConfirm,
    }
  }

  render() {
    return (
      <div className="ios">
        {this.props.children}
        <Confirm ref={confirm => this.confirm = confirm}/>
      </div>
    )
  }

  private handleConfirm = (text: string, buttons: string[] = ['Отмена', 'ОК']) => {
    return this.confirm.toConfirm(text, buttons)
  }
}
