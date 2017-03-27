import React, { PureComponent, PropTypes } from 'react';

import { List } from '../List';
import ListItem from '../List/ListItem';
import formatTime from '../../utils/formatTime';

export default class HistoryDetails extends PureComponent {
    render() {
        const {
            pages,
            speed,
            time,
        } = this.props.item;

        return (
            <List>
                <ListItem center="Страницы" right={pages} />
                <ListItem center="Скорость чтения" right={speed} />
                <ListItem center="Время" right={formatTime(time)} />
            </List>
        );
    }
}

HistoryDetails.propTypes = {
    item: PropTypes.object.isRequired,
};
