import * as React from 'react'

interface Props {
  className?: string
  style?: React.CSSProperties
  src: string
}

export function InlineSvg({ src, ...props }: Props) {
  return <i {...props} dangerouslySetInnerHTML={{ __html: src }} />
}
