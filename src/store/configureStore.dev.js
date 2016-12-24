import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';

import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

// The reduxRouterMiddleware will look for route actions created by push, replace, etc.
// and applies them to the history.
const reduxRouterMiddleware = syncHistory(browserHistory);

const logger = createLogger();

const finalCreateStore = compose(
    applyMiddleware(logger, thunk, reduxRouterMiddleware),
    DevTools.instrument(),
)(createStore);

module.exports = function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);
    reduxRouterMiddleware.listenForReplays(store);

    if (module.hot) {
        module.hot.accept('../reducers', () =>
            store.replaceReducer(rootReducer),
        );
    }
    return store;
};
