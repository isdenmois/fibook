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
import fileUpload from './icons/file_upload.svg';
import bookIcon from './icons/ios-book.svg';
import bookIconOutline from './icons/ios-book-outline.svg';
import flagIcon from './icons/ios-flag.svg';
import flagIconOutline from './icons/ios-flag-outline.svg';
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
                icon: bookIcon,
                activeIcon: bookIconOutline,
            },
            {
                title: 'Прочтенные',
                content: (
                    <ListTab
                        key="read-page-content-list"
                        data={this.props.readBooks}
                    />
                ),
                icon: flagIcon,
                activeIcon: flagIconOutline,
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

        return (
            <span>
                <Tabs data={this.getData()} />
                {this.props.children}
            </span>
        );
    }
}

HomePage.propTypes = {
    createNewBook: PropTypes.func.isRequired,
    newBooks: PropTypes.array,
    readBooks: PropTypes.array,
    loading: PropTypes.bool,
    children: PropTypes.node,
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
