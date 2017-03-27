import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InlineSVG from 'svg-inline-react';

import {
    selectLoading,
} from '../../selectors/main';
import { selectNewBooks, selectReadBooks } from '../../selectors/entities';
import Loading from '../../components/Loading';
import { createNewBook } from '../../actions/details';
import FileInput from '../../components/FileInput';
import ListTab from '../../components/ListTab';
import Tabs from '../../components/Tabs';
import fileUpload from './file_upload.svg';
import css from './HomePage.css';

export class HomePage extends Component {
    getData() {
        return [
            {
                title: 'Новые',
                content: (
                    <ListTab
                        data={this.props.newBooks}
                    />
                ),
                fixed: this.renderFixed(),
                icon: 'ion-ios-book',
            },
            {
                title: 'Прочтенные',
                content: (
                    <ListTab
                        key="read-page-content-list"
                        data={this.props.readBooks}
                    />
                ),
                icon: 'md-library',
            },
        ];
    }

    renderFixed() {
        const { createNewBook: fileSelect } = this.props;

        return (
            <FileInput onFileSelect={fileSelect}>
                <InlineSVG
                    className={css.icon}
                    src={fileUpload}
                />
            </FileInput>
        );
    }

    render() {
        const { loading } = this.props;

        if (loading) {
            return <Loading />;
        }

        return <Tabs data={this.getData()} />;
    }
}

HomePage.propTypes = {
    createNewBook: PropTypes.func.isRequired,
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
};

export default connect(mapStateToProps, mapActionsToProps)(HomePage);
