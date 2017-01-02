import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

// The reduxRouterMiddleware will look for route actions created by push, replace, etc.
// and applies them to the history.
const sagaMiddleware = createSagaMiddleware();

const logger = createLogger();

const finalCreateStore = compose(
    applyMiddleware(logger, sagaMiddleware),
    DevTools.instrument(),
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
