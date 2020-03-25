import * as React from 'react'
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import { HomePage } from './home-page/home-page'
import { BookPage } from './book-page/book-page'

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
