import * as React from 'react'


interface Props {
  children: React.ReactNode
}

export default function App(props: Props) {
  return (
    <div className="ios">
      {props.children}
    </div>
  )
}
