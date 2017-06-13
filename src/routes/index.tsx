import * as React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import BookPage from 'pages/BookPage/components/BookPage'
import HomePage from 'pages/HomePage/components/HomePage'

import AppComponent from 'containers/App'


export default () => (
  <AppComponent>
    <BrowserRouter>
      <div>
        <Route path="/" component={HomePage}/>
        <Route path="/book/:MD5" component={BookPage}/>
      </div>
    </BrowserRouter>
  </AppComponent>
)
