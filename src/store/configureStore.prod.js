import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from '../reducers';

const reduxRouterMiddleware = syncHistory(browserHistory);

const finalCreateStore = compose(
    applyMiddleware(thunk, reduxRouterMiddleware),
)(createStore);

module.exports = function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);
    return store;
};
