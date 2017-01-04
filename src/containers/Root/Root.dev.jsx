import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Routes from '../../routes';

/**
 * Component is exported for conditional usage in Root.js
 */
const Root = props => (
    <Provider store={props.store}>
        <div>
            <MuiThemeProvider>
                <Routes />
            </MuiThemeProvider>
        </div>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

// eslint-disable-next-line no-undef
window.React = React;

export default Root;
