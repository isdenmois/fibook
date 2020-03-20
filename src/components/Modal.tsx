import * as React from 'react'
import * as TransitionGroup from 'react-addons-css-transition-group'

const s = require('./style/modal.css')

interface Props {
  buttons: string[]
  onSelect: (button: number) => void
  open: boolean
  positive?: boolean
  children?: React.ReactNode
}

export function Modal({ buttons, onSelect, children, open, positive }: Props) {
  let inner = null

  if (open) {
    inner = (
      <div className={s.inner}>
        <div className={s.content}>{children}</div>
        <div className={s.buttons}>
          {buttons.map((title, index) => (
            <div className={s.button} key={index} onClick={() => onSelect(index)}>
              {title}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={open ? `${s.modal} ${s.modalIn}` : s.modal}>
      <div className={s.overlay} onClick={() => onSelect(0)} />
      <TransitionGroup
        transitionName={{
          enter: s.enter,
          enterActive: s.enterActive,
          leave: s.leave,
          leaveActive: positive ? s.leaveActive : s.leaveNActive,
        }}
        transitionEnter={true}
        transitionLeave={true}
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
      >
        {inner}
      </TransitionGroup>
    </div>
  )
}
