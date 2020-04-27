import * as React from 'react'

import { InlineSvg } from './inline-svg'

const s = require('./style/loading.css')
const svg = require('./style/loading.svg')

export function Loading() {
  return (
    <div className={s.loading}>
      <InlineSvg className='loading' src={svg} />
    </div>
  )
}
