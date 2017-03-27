import React, { PropTypes, PureComponent } from 'react';

import { List } from '../List';
import ListItem from '../List/ListItem';
import fileSizeConvert from '../../utils/FileSize';

export default class BookDetails extends PureComponent {
    render() {
        const {
            Authors,
            Title,
            Status,
            Progress,
            Size,
        } = this.props.data;
        const status = Status ? 'Прочитано' : 'Непрочитано';

        return (
            <List>
                <ListItem center="Автор" right={Authors} />
                <ListItem center="Название" right={Title} />
                <ListItem center="Статус" right={status} />
                <ListItem center="Прогресс" right={Progress} />
                <ListItem center="Размер" right={fileSizeConvert(Size)} />
            </List>
        );
    }
}

BookDetails.propTypes = {
    data: PropTypes.object,
};
