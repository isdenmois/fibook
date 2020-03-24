import * as React from 'react'
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import { BookPage } from 'pages/book-page/book-page'
import { HomePage } from 'pages/home-page/home-page'

import AppComponent from 'containers/App'

const s = require('theme/global.css')

export default () => (
  <AppComponent>
    <BrowserRouter>
      <div className={s.app}>
        <Route path='/' component={HomePage as any} />
        <Route path='/book/:MD5' component={BookPage as any} />
      </div>
    </BrowserRouter>
  </AppComponent>
)
