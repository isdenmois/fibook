import * as React from 'react'
import { InlineSvg } from './inline-svg'

const s = require('./style/toolbar.css')
const svg = require('./style/ios-arrow-back.svg')
const close = require('./style/close.svg')

interface Props {
  title: React.ReactNode
  backButton?: boolean
  history?: any
}

export const Toolbar = React.memo((props: Props) => {
  const goBack = React.useCallback(() => props.history.replace('/'), [])

  return (
    <div className={s.wrapper}>
      {props.backButton && (
        <div className={s.backButton} onClick={goBack}>
          <InlineSvg className={s.icon} src={svg} />
          Назад
        </div>
      )}
      <div className={s.title}>{props.title}</div>
      {props.backButton && (
        <div className={s.closeButton} onClick={goBack}>
          <InlineSvg src={close} />
        </div>
      )}
    </div>
  )
})
