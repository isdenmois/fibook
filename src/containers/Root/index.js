/* eslint-disable global-require */
let loadedModule = null;

if (process.env.NODE_ENV === 'production') {
    loadedModule = require('./Root.prod.jsx').default;
} else {
    loadedModule = require('./Root.dev.jsx').default;
}

const Root = loadedModule;
export default Root;
