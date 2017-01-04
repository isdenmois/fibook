/**
 * App.react.js
 */
/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadBooks } from '../../actions/list';
import {
    selectError,
} from '../../selectors/main';

export class App extends Component {
    componentDidMount() {
        this.props.loadBooks();
    }
    render() {
        const { children, error, loading } = this.props;
        return (
            <div>
                {
                    error ? error : ''
                }
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