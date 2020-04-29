import * as React from 'react'

const s = require('../style/thumbnail.css')

interface Props {
  id: string
}

export function Thumbnail({ id }: Props) {
  const imageURL = `/thumbnail/${id}`

  return <img className={s.thumbnail} src={imageURL} />
}
