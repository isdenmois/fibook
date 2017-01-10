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
import BookIcon from 'material-ui/svg-icons/editor/insert-drive-file';
import Avatar from 'material-ui/Avatar';
import EmptyList from '../../components/EmptyList';

import {
    selectLoading,
} from '../../selectors/main';
import { selectNewBooks, selectReadBooks } from '../../selectors/entities';
import Loading from '../../components/Loading';
import {
    createNewBook,
    deleteBook,
    updateBookStatus,
} from '../../actions/details';
import FileInput from '../../components/FileInput';

const iconButtonElement = (
    <IconButton>
        <MoreVertIcon color={grey400} />
    </IconButton>
);

export class HomePage extends Component {
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
                <MenuItem className="update" onTouchTap={updateStatus}>{statusTitle}</MenuItem>
                <MenuItem className="delete" onTouchTap={deleteItem}>Удалить</MenuItem>
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
                leftAvatar={<Avatar icon={<BookIcon />} />}
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

        let children = '';

        if (loading) {
            children = <Loading />;
        } else {
            children = (
                <FileInput onFileSelect={fileSelect}>
                    <ContentAdd />
                </FileInput>
            );
        }

        let newBooksChildren = '';
        if (newBooks.length) {
            newBooksChildren = (
                <List>{newBooks.map(this.createListItem)}</List>
            );
        } else if (!loading) {
            newBooksChildren = <EmptyList />;
        }

        let readBooksChildren = '';
        if (readBooks.length) {
            readBooksChildren = (
                <List>{readBooks.map(this.createListItem)}</List>
            );
        } else if (!loading) {
            readBooksChildren = <EmptyList />;
        }

        return (
            <div>
                <Tabs>
                    <Tab label="Новые">
                        {newBooksChildren}
                    </Tab>
                    <Tab label="Прочитанные">
                        {readBooksChildren}
                    </Tab>
                </Tabs>
                {children}
            </div>
        );
    }
}

HomePage.propTypes = {
    createNewBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    updateBookStatus: PropTypes.func.isRequired,
    newBooks: PropTypes.array,
    readBooks: PropTypes.array,
    loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    newBooks: selectNewBooks,
    readBooks: selectReadBooks,
    loading: selectLoading,
});

const mapActionsToProps = {
    createNewBook,
    deleteBook,
    updateBookStatus,
};

export default connect(mapStateToProps, mapActionsToProps)(HomePage);
