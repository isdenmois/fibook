/* eslint-disable global-require */
// export devtools only in dev mode

let loadedStore = null;

if (process.env.NODE_ENV === 'production') {
    loadedStore = require('./configureStore.prod').default;
} else {
    loadedStore = require('./configureStore.dev').default;
}

const configureStore = loadedStore;

export default configureStore;
