import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider as MobxProvider } from 'mobx-react'

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
  const Provider: any = MobxProvider

  ReactDOM.render(
    <Provider {...stores}>
      <Root />
    </Provider>,
    rootEl,
  )
}

if ((module as any).hot) {
  const renderApp = renderDom

  renderDom = () => {
    try {
      renderApp()
    } catch (error) {
      console.error(error)
    }
  }
  ;(module as any).hot.accept('./containers/Root', () => setTimeout(renderDom))
}

renderDom()
