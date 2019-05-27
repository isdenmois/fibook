import * as React from 'react'
import Routes from 'routes'
const DevTools = require('mobx-react-devtools').default


/**
 * Component is exported for conditional usage in Root.js
 */
const Root = () => (
  <div>
    <Routes />
    <DevTools position={{top: 50, right: 0}}/>
  </div>
)

export default Root
