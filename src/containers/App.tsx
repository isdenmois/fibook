import * as React from 'react'

import { Confirm } from 'components/confirm'
const s = require('theme/global.css')

export default function App({ children }) {
  return (
    <div className={s.ios}>
      <Confirm>{children}</Confirm>
    </div>
  )
}
