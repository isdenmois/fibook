import * as React from 'react'

import { InlineSvg } from 'components/inline-svg'

const svg = require('../style/bookProgress.svg')
const s = require('../style/bookProgress.css')

interface Props {
  status: number
  progress: string
  lastRead: string
}

export function BookProgress({ status, progress, lastRead }: Props) {
  const parts = progress ? progress.split('/') : [0, 1]
  const position = +parts[0]
  const total = +parts[1]
  const isRead = status || total - position < 5

  if (!position) {
    return null
  }

  if (position > 0 && isRead) {
    return <div className={s.read}>Прочитано {lastRead}</div>
  }

  const percent = (position / total) * 100 - 100

  return (
    <div className={s.progress}>
      <InlineSvg className={s.wrapper} src={svg} style={{ left: `${percent}%` }} />
    </div>
  )
}
