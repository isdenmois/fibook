import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'mobx-react'

// Both configureStore and Root are required conditionally.
import BookStore from './stores/BookStore'
import HomePageStore from './stores/HomePageStore'
require('./theme/global.css')
require('./theme/variables.css')


const homePageStore = new HomePageStore()
const stores = {
  bookStore: new BookStore(homePageStore),
  homePageStore,
}

const rootEl = document.getElementById('root')

// necessary for hot reloading
let renderDom = () => {
  const Root = require('./containers/Root/index').default
  ReactDOM.render(
    <Provider {...stores}>
      <Root />
    </Provider>,
    rootEl,
  )
}

if ((module as any).hot) {
  const renderApp = renderDom
  const RedBox = require('redbox-react').default
  const renderError = (error: any) => ReactDOM.render(<RedBox error={error}/>, rootEl)

  renderDom = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }

  (module as any).hot.accept('./containers/Root', () => setTimeout(renderDom))
}

renderDom()
