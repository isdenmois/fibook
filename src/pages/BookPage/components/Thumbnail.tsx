import * as React from 'react'

const s = require('./style/thumbnail.css')


interface Props {
  url: string
}


export default class Thumbnail extends React.Component<Props, void> {

  render() {
    let url = this.props.url
    if (url.startsWith('/')) {
      url = url.slice(1)
    }

    const imageURL = `/thumbnail/${url}`
    return (
      <img className={s.thumbnail} src={imageURL}/>
    )
  }
}
