import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
    BackButton,
    Button,
    Page,
    Toolbar,
} from 'react-onsenui';

import navigate from '../../utils/navigate';
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
import Chart from '../../components/Chart';
import HistoryDetails from '../../components/HistoryDetails';

import { bookPage } from './BookPage.scss';

/* global window, confirm */
export class BookPage extends Component {
    constructor(props) {
        super(props);

        this.handleClick = ::this.handleClick;
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
        const { MD5 } = this.props.params;
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

    handleClick() {
        navigate('/');
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
        const { MD5 } = this.props.params;
        const book = this.props.details.get(MD5);
        const newStatus = book.Status > 0 ? 0 : 1;

        this.props.updateBookStatus(MD5, newStatus);
        book.Status = newStatus;
        this.setState({});
    }

    deleteBook() {
        if (confirm('Удалить книгу?')) {
            const { MD5 } = this.props.params;
            this.props.deleteBook(MD5);
            navigate('/');
        }
    }

    renderToolbar() {
        return (
            <Toolbar>
                <div className="left">
                    <BackButton onClick={this.handleClick}>
                        Назад
                    </BackButton>
                </div>
                <div className="center">Подробности</div>
            </Toolbar>
        );
    }

    renderBottomToolbar() {
        const { MD5 } = this.props.params;
        const data = this.props.details.get(MD5);

        return (
            <div className="buttons tab-bar">
                <Button
                    onClick={this.updateItemStatus}
                >
                    {data.Status ? 'В новые' : 'В прочтенные' }
                </Button>
                <Button
                    onClick={this.deleteBook}
                >
                    Удалить
                </Button>
            </div>
        );
    }

    render() {
        const { MD5 } = this.props.params;
        const data = this.props.details.get(MD5);

        if (this.props.loading || !data) {
            return (
                <Page
                    renderToolbar={this.renderToolbar}
                    className={bookPage}
                >
                    <Loading />
                </Page>
            );
        }

        const history = data.history;
        const historyItem = this.state.selected || history[0];

        return (
            <Page
                renderToolbar={this.renderToolbar}
                renderBottomToolbar={this.renderBottomToolbar}
                className={bookPage}
            >
                <div className="primary">
                    <div className="title">{data.Title}</div>
                    <div className="author">{data.Authors}</div>
                    <BookProgress
                        lastRead={data.lastRead}
                        progress={data.Progress}
                    />
                </div>
                <BookDetails
                    data={data}
                />
                {
                    history.length > 1 && (
                        <Chart
                            dataset={history}
                            onSelect={this.handleSelect}
                        />
                    )
                }
                { historyItem && (
                    <HistoryDetails
                        item={historyItem}
                    />
                )}
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
    params: PropTypes.object.isRequired,
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
