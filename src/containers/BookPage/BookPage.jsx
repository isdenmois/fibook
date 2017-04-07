import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Timeline from 'components/Timeline';
import Button from 'components/Button';
import Toolbar from 'components/Toolbar';
import Page from '../../components/Page';

import {
    loadDetails,
    updateBookStatus,
    deleteBook,
} from '../../actions/details';
import { selectDetails } from '../../selectors/entities';
import { selectLoading } from '../../selectors/details';
import Loading from '../../components/Loading';
import BookProgress from '../../components/BookProgress';
import BookDetails from '../../components/BookDetails';

import css from './BookPage.css';

/* global window, confirm */
export class BookPage extends Component {
    constructor(props) {
        super(props);

        this.renderToolbar = ::this.renderToolbar;
        this.handleSelect = ::this.handleSelect;
        this.deleteBook = ::this.deleteBook;
        this.renderBottomToolbar = ::this.renderBottomToolbar;
        this.updateItemStatus = ::this.updateItemStatus;
        this.handleOrientation = ::this.handleOrientation;

        this.state = {
            selected: null,
        };
    }

    componentWillMount() {
        const { MD5 } = this.props.match.params;
        if (!this.props.details.get(MD5)) {
            this.props.loadDetails(MD5);
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleOrientation);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleOrientation);
    }

    handleSelect(event) {
        this.setState({
            selected: event.payload,
        });
    }

    handleOrientation() {
        this.setState({});
    }


    updateItemStatus() {
        const { MD5 } = this.props.match.params;
        const book = this.props.details.get(MD5);
        const newStatus = book.Status > 0 ? 0 : 1;

        this.props.updateBookStatus(MD5, newStatus);
        book.Status = newStatus;
        this.setState({});
    }

    deleteBook() {
        if (confirm('Удалить книгу?')) {
            const { MD5 } = this.props.match.params;
            this.props.deleteBook(MD5);
            this.context.router.history.push('/');
        }
    }

    renderToolbar() {
        return (
            <Toolbar
                backButton
                title="Подробности"
            />
        );
    }

    renderBottomToolbar() {
        const { MD5 } = this.props.match.params;
        const data = this.props.details.get(MD5);

        return [
            <Button
                key="status"
                onClick={this.updateItemStatus}
            >
                {data.Status ? 'В новые' : 'В прочтенные' }
            </Button>,
            <Button
                key="delete"
                onClick={this.deleteBook}
            >
                Удалить
            </Button>,
        ];
    }

    render() {
        const { MD5 } = this.props.match.params;
        const data = this.props.details.get(MD5);

        if (this.props.loading || !data) {
            return (
                <Page
                    toolbar={this.renderToolbar()}
                >
                    <Loading />
                </Page>
            );
        }

        return (
            <Page
                toolbar={this.renderToolbar()}
                tabbar={this.renderBottomToolbar()}
                bottomToolbar={this.renderBottomToolbar}
            >
                <div className={css.primary}>
                    <div className={css.title}>{data.Title}</div>
                    <div className={css.author}>{data.Authors}</div>
                    <BookProgress
                        lastRead={data.lastRead}
                        progress={data.Progress}
                    />
                </div>
                <BookDetails
                    data={data}
                />
                <Timeline data={data.history} />
            </Page>
        );
    }
}

BookPage.propTypes = {
    details: PropTypes.object,
    loading: PropTypes.bool,
    deleteBook: PropTypes.func,
    loadDetails: PropTypes.func,
    updateBookStatus: PropTypes.func,
    match: PropTypes.object.isRequired,
};

BookPage.contextTypes = {
    router: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    details: selectDetails,
    loading: selectLoading,
});

const mapActionsToProps = {
    loadDetails,
    deleteBook,
    updateBookStatus,
};

export default connect(mapStateToProps, mapActionsToProps)(BookPage);
