import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
    BackButton,
    Button,
    Page,
    Toolbar,
    ProgressBar,
} from 'react-onsenui';
import ons from 'onsenui';

import navigate from '../../utils/navigate';
import {
    loadDetails,
    updateBookStatus,
    deleteBook,
} from '../../actions/details';
import { selectDetails } from '../../selectors/entities';
import { selectLoading } from '../../selectors/details';
import Loading from '../../components/Loading';
import fileSizeConvert from '../../utils/FileSize';
import Chart from '../../components/Chart';
import HistoryDetails from '../../components/HistoryDetails';

import { bookPage } from './BookPage.scss';

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
        ons.orientation.on('change', this.handleOrientation);
    }

    componentWillUnmount() {
        ons.orientation.off('change', this.handleOrientation);
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
        const callback = (button) => {
            if (button > 0) {
                const { MD5 } = this.props.params;
                this.props.deleteBook(MD5);
                navigate('/');
            }
        };

        ons.notification.confirm('Действие нельзя отменить', {
            buttonLabels: ['Отмена', 'OK'],
            callback,
            title: 'Удалить книгу?',
        });
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

        const dataset = data.history;
        const historyItem = this.state.selected || dataset[0];

        let progress = data.Progress || '0/1';
        progress = progress.split('/');
        const status = progress[1] - progress[0] < 5;
        progress = (progress[0] / progress[1]) * 100;

        return (
            <Page
                renderToolbar={this.renderToolbar}
                renderBottomToolbar={this.renderBottomToolbar}
                className={bookPage}
            >
                <div className="primary">
                    <div className="title">{data.Title}</div>
                    <div className="author">{data.Authors}</div>
                    {status ? (
                        <div className="read">
                            Прочитано {new Date(data.LastAccess).toLocaleDateString()}
                        </div>
                        ) : (
                            <ProgressBar className="pb" value={progress} />
                        )}
                </div>
                <ons-list>
                    <ons-list-item>
                        <div className="center">Автор</div>
                        <div className="right">{data.Authors}</div>
                    </ons-list-item>
                    <ons-list-item>
                        <div className="center">Название</div>
                        <div className="right">{data.Title}</div>
                    </ons-list-item>
                    <ons-list-item>
                        <div className="center">Статус</div>
                        <div className="right">{data.Status ? 'Прочитано' : 'Непрочитано'}</div>
                    </ons-list-item>
                    <ons-list-item>
                        <div className="center">Прогресс</div>
                        <div className="right">{data.Progress}</div>
                    </ons-list-item>
                    <ons-list-item>
                        <div className="center">Размер</div>
                        <div className="right">{fileSizeConvert(data.Size)}</div>
                    </ons-list-item>
                </ons-list>
                {
                    dataset.length > 1 && (
                        <Chart
                            dataset={dataset}
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
