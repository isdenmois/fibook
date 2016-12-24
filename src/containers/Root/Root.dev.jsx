import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DevTools from '../DevTools';
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
            <DevTools />
        </div>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;
