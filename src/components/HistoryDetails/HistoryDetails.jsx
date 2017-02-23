import React, { PureComponent, PropTypes } from 'react';

import List from '../List';
import ListItem from '../List/ListItem';
import ListHeader from '../List/ListHeader';
import formatTime from '../../utils/formatTime';

export default class HistoryDetails extends PureComponent {
    render() {
        const {
            date,
            pages,
            speed,
            percent,
            progress,
            time,
        } = this.props.item;

        return (
            <List>
                <ListHeader>{date}</ListHeader>
                <ListItem center="Дата" right={date} />
                <ListItem center="Страницы" right={pages} />
                <ListItem center="Скорость чтения" right={speed} />
                <ListItem center="Процент" right={`${percent}%`} />
                <ListItem center="Прогресс" right={progress} />
                <ListItem center="Время" right={formatTime(time)} />
            </List>
        );
    }
}

HistoryDetails.propTypes = {
    item: PropTypes.object.isRequired,
};
