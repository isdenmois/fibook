import * as React from 'react'


interface Props {
  className?: string
  style?: React.CSSProperties
  src: string
}

export default class InlineSvg extends React.Component<Props> {

  render() {
    const {src, ...props} = this.props
    return <i {...props} dangerouslySetInnerHTML={{__html: this.props.src}}/>
  }
}
