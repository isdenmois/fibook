import * as React from 'react'
import InlineSVG from './InlineSvg'
const svg = require('./style/spinner.svg')

export default class Spinner extends React.PureComponent<any> {
  render() {
    return <InlineSVG src={svg} />
  }
}
