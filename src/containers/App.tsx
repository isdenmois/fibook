import * as React from 'react'

import { Confirm } from 'components/confirm'
import { FileUploader } from 'components/uploader'
const s = require('theme/global.css')

export default function App({ children }) {
  return (
    <div className={s.ios}>
      <Confirm>
        <FileUploader>{children}</FileUploader>
      </Confirm>
    </div>
  )
}
