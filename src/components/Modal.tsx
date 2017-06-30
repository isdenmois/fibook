import * as React from 'react'

const s = require('./style/modal.css')

interface Props {
  buttons: string[]
  onSelect: (button: number) => void
  open: boolean
}

export default class Modal extends React.Component<Props, void> {

  render() {
    if (!this.props.open) {
      return null
    }

    const {buttons, onSelect, children} = this.props

    return (
      <div className={s.modal}>
        <div className={s.overlay} onClick={() => onSelect(0)}/>
        <div className={s.inner}>
          <div className={s.content}>
            {children}
          </div>
          <div className={s.buttons}>
            {buttons.map((title, index) =>
              <div className={s.button} key={index} onClick={() => onSelect(index)}>{title}</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
