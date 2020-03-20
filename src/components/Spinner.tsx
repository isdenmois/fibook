import * as React from 'react'
import { InlineSvg } from './inline-svg'
const svg = require('./style/spinner.svg')

export function Spinner() {
  return <InlineSvg src={svg} />
}
