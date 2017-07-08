import * as React from 'react'
const InlineSVG = require('svg-inline-react')
const svg = require('./style/spinner.svg')


export default class Spinner extends React.PureComponent<any> {

  render() {
    return <InlineSVG src={svg}/>
  }
}
