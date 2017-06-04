import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';
import { Provider } from 'mobx-react';

// Both configureStore and Root are required conditionally.
import BookStore from './stores/BookStore';
import HomePageStore from './stores/HomePageStore';
import './theme/variables.css';

/* global document */
/* eslint-disable global-require */

const stores = {
    bookStore: new BookStore(),
    homePageStore: new HomePageStore(),
};

const rootEl = document.getElementById('root');

// necessary for hot reloading
let renderDom = () => {
    const Root = require('./containers/Root').default;
    ReactDOM.render(
        <Provider {...stores}>
            <Root />
        </Provider>,
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
