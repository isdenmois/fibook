import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Both configureStore and Root are required conditionally.
import configureStore from './store/configureStore';
import rootSaga from './sagas';

/* global document */
/* eslint-disable global-require */

const store = configureStore();
store.runSaga(rootSaga);

const rootEl = document.getElementById('root');
injectTapEventPlugin();

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
