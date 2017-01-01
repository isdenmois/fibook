import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Tabs, Tab } from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey400 } from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add';

import {
    selectLoading,
} from '../../selectors/books';
import { selectBookEntities, selectBooksByType } from '../../selectors/entities';
import Loading from '../../components/Loading';
import {
    createNewBook,
    deleteBook,
    updateBookStatus,
} from '../../actions/books';
import FileInput from '../../components/FileInput';

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
        const deleteItem = () => this.props.deleteBook(MD5);

        return (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onTouchTap={updateStatus}>{statusTitle}</MenuItem>
                <MenuItem onTouchTap={deleteItem}>Удалить</MenuItem>
            </IconMenu>
        );
    }

    createListItem(book) {
        const MD5 = book.get('MD5');
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

    render() {
        const {
            createNewBook: fileSelect,
            loading,
            newBooks,
            readBooks,
        } = this.props;

        if (loading) {
            return (
                <div>
                    <Tabs>
                        <Tab label="Новые" />
                        <Tab label="Прочитанные" />
                    </Tabs>
                    <Loading />
                </div>
            );
        }

        return (
            <Tabs>
                <Tab
                    label="Новые"
                >
                    <List>
                        {newBooks.map(this.createListItem)}
                    </List>
                    <FileInput onFileSelect={fileSelect}>
                        <ContentAdd />
                    </FileInput>
                </Tab>
                <Tab
                    label="Прочитанные"
                >
                    <List>
                        {readBooks.map(this.createListItem)}
                    </List>
                </Tab>
            </Tabs>
        );
    }
}

HomePage.propTypes = {
    createNewBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    updateBookStatus: PropTypes.func.isRequired,
    newBooks: PropTypes.object,
    readBooks: PropTypes.object,
    loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    newBooks: selectBooksByType(0),
    readBooks: selectBooksByType(1),
    entities: selectBookEntities(),
    loading: selectLoading(),
});

const mapActionsToProps = {
    createNewBook,
    deleteBook,
    updateBookStatus,
};

export default connect(mapStateToProps, mapActionsToProps)(HomePage);
