import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';

// Both configureStore and Root are required conditionally.
import configureStore from './store/configureStore';

/* global document */
/* eslint-disable global-require */

const store = configureStore();
const rootEl = document.getElementById('root');

// necessary for hot reloading
let render = () => {
    const Root = require('./containers/Root').default;
    ReactDOM.render(
        <Root store={store} />,
        rootEl,
    );
};

if (module.hot) {
    const renderApp = render;
    const renderError = (error) => {
        ReactDOM.render(
            <RedBox error={error} />,
            rootEl,
        );
    };
    render = () => {
        try {
            renderApp();
        } catch (error) {
            renderError(error);
        }
    };
    module.hot.accept('./containers/Root', () => {
        setTimeout(render);
    });
}

render();
