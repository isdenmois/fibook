/**
 * App.react.js
 */
/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadBooks } from '../../actions/books';

class App extends Component {
    componentDidMount() {
        this.props.loadBooks();
    }
    render() {
        const { children } = this.props;
        return (
            <div>
                {React.Children.toArray(children)}
            </div>
        );
    }
}

App.propTypes = {
    loadBooks: PropTypes.func.isRequired,
    children: PropTypes.node,
};


function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, { loadBooks })(App);
