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
        this.renderFixed = this.renderFixed.bind(this);
        this.renderTabs = this.renderTabs.bind(this);
        this.changeIndex = this.changeIndex.bind(this);

        this.state = { index: 0 };
    }

    changeIndex(event) {
        this.setState({
            index: event.index,
        });
    }

    updateItemStatus(book) {
        const MD5 = book.get('MD5');
        const newStatus = book.get('status') > 0 ? 0 : 1;
        this.props.updateBookStatus(MD5, newStatus);
    }

    renderFixed() {
        const { createNewBook: fileSelect } = this.props;

        return (
            <FileInput onFileSelect={fileSelect}>
                <Icon icon="md-file-plus" />
            </FileInput>
        );
    }

    renderTabs() {
        const {
            newBooks,
            readBooks,
        } = this.props;

        return [
            {
                content: (
                    <Page
                        key="new-page-content"
                        renderFixed={this.renderFixed}
                    >
                        <ListTab
                            key="new-page-content-list"
                            onChange={this.updateItemStatus}
                            data={newBooks}
                        />
                    </Page>
                ),
                tab: (
                    <Tab
                        key="new-page-tab"
                        label="Новые"
                        icon="ion-ios-book"
                    />
                ),
            },
            {
                content: (
                    <Page key="read-page-content">
                        <ListTab
                            key="read-page-content-list"
                            onChange={this.updateItemStatus}
                            data={readBooks}
                        />
                    </Page>
                ),
                tab: (
                    <Tab
                        key="read-page-tab"
                        label="Прочтенные"
                        icon="md-library"
                    />
                ),
            },
        ];
    }

    render() {
        const { loading } = this.props;
        const index = this.state.index;

        if (loading) {
            return <Loading />;
        }

        return (
            <div>
                <Tabbar
                    animation="slide"
                    index={index}
                    onPreChange={this.changeIndex}
                    renderTabs={this.renderTabs}
                    position={ons.platform.isAndroid() ? 'top' : null}
                />
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
