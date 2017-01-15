import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ons from 'onsenui';
import { Icon, Page, Tab, Tabbar } from 'react-onsenui';

import {
    selectLoading,
} from '../../selectors/main';
import { selectNewBooks, selectReadBooks } from '../../selectors/entities';
import Loading from '../../components/Loading';
import {
    createNewBook,
    updateBookStatus,
} from '../../actions/details';
import FileInput from '../../components/FileInput';
import ListTab from '../../components/ListTab';

export class HomePage extends Component {
    constructor(props) {
        super(props);
        this.updateItemStatus = this.updateItemStatus.bind(this);
        this.renderTabs = this.renderTabs.bind(this);
    }

    updateItemStatus(book) {
        const MD5 = book.get('MD5');
        const newStatus = book.get('status') > 0 ? 0 : 1;
        this.props.updateBookStatus(MD5, newStatus);
    }

    renderTabs() {
        const {
            newBooks,
            readBooks,
        } = this.props;

        return [
            {
                content: (
                    <Page>
                        <ListTab
                            onChange={this.updateItemStatus}
                            data={newBooks}
                        />
                    </Page>
                ),
                tab: <Tab label="Новые" icon="ion-ios-book" />,
            },
            {
                content: (
                    <Page>
                        <ListTab
                            onChange={this.updateItemStatus}
                            data={readBooks}
                        />
                    </Page>
                ),
                tab: <Tab label="Прочтенные" icon="md-library" />,
            },
        ];
    }

    render() {
        const {
            loading,
            createNewBook: fileSelect,
        } = this.props;

        if (loading) {
            return <Loading />;
        }

        return (
            <div>
                <Tabbar
                    renderTabs={this.renderTabs}
                    position={ons.platform.isAndroid() ? 'top' : null}
                />

                <FileInput onFileSelect={fileSelect}>
                    <Icon icon="md-file-plus" />
                </FileInput>
            </div>
        );
    }
}

HomePage.propTypes = {
    createNewBook: PropTypes.func.isRequired,
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
    updateBookStatus,
};

export default connect(mapStateToProps, mapActionsToProps)(HomePage);
