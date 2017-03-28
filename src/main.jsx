import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';

// Both configureStore and Root are required conditionally.
import configureStore from './store/configureStore';
import rootSaga from './sagas';
import './theme/variables.css';

/* global document */
/* eslint-disable global-require */

const store = configureStore();
store.runSaga(rootSaga);

const rootEl = document.getElementById('root');

// necessary for hot reloading
let renderDom = () => {
    const Root = require('./containers/Root').default;
    ReactDOM.render(
        <Root store={store} />,
        rootEl,
    );
};

if (module.hot) {
    const renderApp = renderDom;
    const renderError = (error) => {
        ReactDOM.render(
            <RedBox error={error} />,
            rootEl,
        );
    };
    renderDom = () => {
        try {
            renderApp();
        } catch (error) {
            renderError(error);
        }
    };
    module.hot.accept('./containers/Root', () => {
        setTimeout(renderDom);
    });
}

renderDom();
