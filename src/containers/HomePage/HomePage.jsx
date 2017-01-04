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
import Avatar from 'material-ui/Avatar';
import { stringify } from 'querystring';

import {
    selectLoading,
} from '../../selectors/main';
import { selectBookEntities } from '../../selectors/entities';
import { selectStatus } from '../../selectors/list';
import Loading from '../../components/Loading';
import {
    createNewBook,
    deleteBook,
    updateBookStatus,
} from '../../actions/details';
import { bookListStatus } from '../../actions/list';
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
        this.openNewBookList = this.openNewBookList.bind(this);
        this.openReadBookList = this.openReadBookList.bind(this);
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
        const thumbnail = book.get('thumbnail');
        const image = `/image?${stringify({ path: thumbnail })}`;

        return (
            <ListItem
                key={MD5}
                leftAvatar={<Avatar src={image} />}
                primaryText={title}
                secondaryText={author}
                rightIconButton={this.createItemMenu(MD5, status)}
            />
        );
    }

    openNewBookList() {
        this.props.bookListStatus(0);
    }

    openReadBookList() {
        this.props.bookListStatus(1);
    }

    updateItemStatus(MD5, status) {
        const newStatus = status > 0 ? 0 : 1;
        this.props.updateBookStatus(MD5, newStatus);
    }

    render() {
        const {
            createNewBook: fileSelect,
            loading,
            status,
            books,
        } = this.props;

        let children = '';

        if (loading) {
            children = <Loading />;
        } else if (status > 0) {
            children = (
                <List>
                    {books.map(this.createListItem)}
                </List>
            );
        } else {
            children = (
                <div>
                    <List>
                        {books.map(this.createListItem)}
                    </List>
                    <FileInput onFileSelect={fileSelect}>
                        <ContentAdd />
                    </FileInput>
                </div>
            );
        }

        return (
            <div>
                <Tabs>
                    <Tab
                        label="Новые"
                        onActive={this.openNewBookList}
                    />
                    <Tab
                        label="Прочитанные"
                        onActive={this.openReadBookList}
                    />
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
    bookListStatus: PropTypes.func.isRequired,
    books: PropTypes.array,
    loading: PropTypes.bool,
    status: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
    status: selectStatus,
    books: selectBookEntities,
    loading: selectLoading,
});

const mapActionsToProps = {
    createNewBook,
    deleteBook,
    updateBookStatus,
    bookListStatus,
};

export default connect(mapStateToProps, mapActionsToProps)(HomePage);