import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Routes from '../../routes';

/**
 * Component is exported for conditional usage in Root.js
 */
const Root = props => (
    <Provider store={props.store}>
        <MuiThemeProvider>
            <Routes history={props.history} />
        </MuiThemeProvider>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default Root;
