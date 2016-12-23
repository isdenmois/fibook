/**
 * Entry point of application.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import configureStore from './store';

import 'sanitize.css/sanitize.css';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import { selectLocationState } from './containers/App/selectors';
const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
import App from './containers/App';
import createRoutes from './routes';
const rootRoute = {
    component: App,
    childRoutes: createRoutes(store),
};

ReactDOM.render(
    <Provider store={store}>
        <Router
            history={history}
            routes={rootRoute}
            render={
                // Scroll to top when going to a new page, imitating default browser
                // behaviour
                applyRouterMiddleware(useScroll())
            }
        />
    </Provider>,
    document.getElementById('app')
);
