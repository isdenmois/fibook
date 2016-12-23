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

import App from './containers/App';
import createRoutes from './routes';
const rootRoute = {
    component: App,
    childRoutes: createRoutes(store),
};

const render = () => {
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
};

// Hot reloadable translation json files
if (module.hot) {
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(() => {
        render();
    });
}

render();
