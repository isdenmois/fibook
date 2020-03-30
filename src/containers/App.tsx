import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

import { client } from 'services/graphql'

import { Confirm } from 'components/confirm'
import { FileUploader } from 'components/uploader'
const s = require('theme/global.css')

export default function App({ children }) {
  return (
    <ApolloProvider client={client}>
      <div className={s.ios}>
        <Confirm>
          <FileUploader>{children}</FileUploader>
        </Confirm>
      </div>
    </ApolloProvider>
  )
}
