/**
 * App.react.js
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ons from 'onsenui';

import { loadBooks } from '../../actions/list';
import {
selectError,
} from '../../selectors/main';

export function getDevice() {
    return ons.platform.isAndroid() ? 'android' : 'ios';
}

const device = getDevice();
export class App extends Component {
    componentDidMount() {
        this.props.loadBooks();
    }
    render() {
        const { children, error } = this.props;
        return (
            <div className={device}>
                {error}
                {React.Children.toArray(children)}
            </div>
        );
    }
}

App.propTypes = {
    loadBooks: PropTypes.func.isRequired,
    error: PropTypes.string,
    children: PropTypes.node,
};


const mapStateToProps = createStructuredSelector({
    error: selectError,
});

const mapActionsToProps = {
    loadBooks,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
