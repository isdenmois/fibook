import * as React from 'react'
import * as ReactDOM from 'react-dom'

require('./theme/global.css')
require('./theme/variables.css')

const rootEl = document.getElementById('root')

// necessary for hot reloading
let renderDom = () => {
  const Root = require('./containers/Root/index').default

  ReactDOM.render(<Root />, rootEl)
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
