import React, { PropTypes, PureComponent } from 'react';

import List from '../List';
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

        return (
            <List>
                <ons-list-item>
                    <div className="center">Автор</div>
                    <div className="right">{Authors}</div>
                </ons-list-item>
                <ons-list-item>
                    <div className="center">Название</div>
                    <div className="right">{Title}</div>
                </ons-list-item>
                <ons-list-item>
                    <div className="center">Статус</div>
                    <div className="right">{Status ? 'Прочитано' : 'Непрочитано'}</div>
                </ons-list-item>
                <ons-list-item>
                    <div className="center">Прогресс</div>
                    <div className="right">{Progress}</div>
                </ons-list-item>
                <ons-list-item>
                    <div className="center">Размер</div>
                    <div className="right">{fileSizeConvert(Size)}</div>
                </ons-list-item>
            </List>
        );
    }
}

BookDetails.propTypes = {
    data: PropTypes.object,
};
