import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../containers/App';
import HomePage from '../containers/HomePage';
import NotFound from '../containers/NotFound';

export default () => (
    <Router history={browserHistory}>
        {/* 'App' acts as a wrapper for the child components */}
        <Route path="/" component={App}>
            {/* IndexRoute is the initial component that is loaded,
             other routes are loaded according to the component
             property specified here */}
            <IndexRoute component={HomePage} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);
