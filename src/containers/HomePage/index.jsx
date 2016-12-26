import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { List, ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey400 } from 'material-ui/styles/colors';

import {
    selectBooks,
    selectLoading,
} from '../../selectors/books';
import { selectBookEntities } from '../../selectors/entities';
import Loading from '../../components/Loading';
import { updateBookStatus } from '../../actions/books';

const iconButtonElement = (
    <IconButton>
        <MoreVertIcon color={grey400} />
    </IconButton>
);

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.createListItem = this.createListItem.bind(this);
    }

    createItemMenu(MD5, status) {
        const statusTitle = status > 0 ? 'Не прочитано' : 'Прочитано';
        const updateStatus = this.updateItemStatus.bind(this, MD5, status);
        const deleteItem = this.deleteItem.bind(this, MD5);

        return (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onTouchTap={updateStatus}>{statusTitle}</MenuItem>
                <MenuItem onTouchTap={deleteItem}>Удалить</MenuItem>
            </IconMenu>
        );
    }

    createListItem(MD5) {
        const book = this.props.entities.get(MD5);
        const title = book.get('title');
        const author = book.get('author');
        const status = book.get('status');

        return (
            <ListItem
                key={MD5}
                primaryText={title}
                secondaryText={author}
                rightIconButton={this.createItemMenu(MD5, status)}
            />
        );
    }

    updateItemStatus(MD5, status) {
        const newStatus = status > 0 ? 0 : 1;
        this.props.updateBookStatus(MD5, newStatus);
    }

    deleteItem(MD5) {
        console.log(MD5);
    }

    render() {
        const { books, loading } = this.props;
        if (loading) {
            return <Loading />;
        }

        return (
            <List>
                {books.map(this.createListItem)}
            </List>
        );
    }
}

HomePage.propTypes = {
    updateBookStatus: PropTypes.func.isRequired,
    books: PropTypes.object,
    entities: PropTypes.object,
    loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    books: selectBooks(),
    entities: selectBookEntities(),
    loading: selectLoading(),
});

const mapActionsToProps = {
    updateBookStatus,
};

export default connect(mapStateToProps, mapActionsToProps)(HomePage);
