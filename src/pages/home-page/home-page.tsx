import * as React from 'react'

import { EventBus } from 'utils/event-bus'

import { FileUploaderContext } from 'components/uploader'
import { InlineSvg } from 'components/inline-svg'
import { FileInput } from 'components/file-input'
import Tabs from 'components/tabs'
import { NEW_LIST_VARS, READ_LIST_VARS } from './home-page-queries'
import { BooksList } from './components/book-list'

const fileUpload = require('./icons/file_upload.svg')
const bookIcon = require('./icons/ios-book.svg')
const bookIconOutline = require('./icons/ios-book-outline.svg')
const flagIcon = require('./icons/ios-flag.svg')
const flagIconOutline = require('./icons/ios-flag-outline.svg')
const s = require('./style/home-page.css')

export function HomePage({ history, children }) {
  const context = React.useContext(FileUploaderContext)
  const createBook = async (files: File[]) => {
    history.replace('/')
    await context.upload(files)
    EventBus.dispatch('refresh')
  }

  const fixed = (
    <>
      <FileInput name='book-upload' onFileSelect={createBook}>
        <InlineSvg className={s.icon} src={fileUpload} />
      </FileInput>

      <div className={s.version}>{VERSION}</div>
    </>
  )

  return (
    <>
      <Tabs name='home'>
        {[
          {
            title: 'Новые',
            content: <BooksList variables={NEW_LIST_VARS} />,
            fixed,
            icon: bookIcon,
            activeIcon: bookIconOutline,
          },
          {
            title: 'Прочтенные',
            content: <BooksList variables={READ_LIST_VARS} />,
            fixed,
            icon: flagIcon,
            activeIcon: flagIconOutline,
          },
        ]}
      </Tabs>
      {children}
    </>
  )
}
