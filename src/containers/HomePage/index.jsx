import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { List, ListItem } from 'material-ui/List';

import {
    selectBooks,
    selectLoading,
} from '../../selectors/books';

class HomePage extends Component {
    createListItem(data) {
        return (
            <ListItem
                key={data.MD5}
                primaryText={data.title}
                secondaryText={data.author}
            />
        );
    }

    render() {
        const { books, loading } = this.props;
        if (loading) {
            return <div>Загрузка...</div>;
        }

        return (
            <List>
                {books.map(this.createListItem)}
            </List>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    books: selectBooks(),
    loading: selectLoading(),
});


export default connect(mapStateToProps, {})(HomePage);
