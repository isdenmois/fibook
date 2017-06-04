import React from 'react';
import DevTools from 'mobx-react-devtools';
import Routes from '../../routes';

/**
 * Component is exported for conditional usage in Root.js
 */
const Root = () => (
    <div>
        <Routes />
        <DevTools position={{ top: 50, right: 0 }} />
    </div>
);

// eslint-disable-next-line no-undef
window.React = React;

export default Root;
