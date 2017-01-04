import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';

// The reduxRouterMiddleware will look for route actions created by push, replace, etc.
// and applies them to the history.
const sagaMiddleware = createSagaMiddleware();

const logger = createLogger();
// eslint-disable-next-line
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const finalCreateStore = reduxDevtools ? compose(
    applyMiddleware(logger, sagaMiddleware),
    reduxDevtools,
)(createStore) : compose(
    applyMiddleware(logger, sagaMiddleware),
)(createStore);

module.exports = function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(rootReducer),
        );
    }

    store.runSaga = sagaMiddleware.run;

    return store;
};
