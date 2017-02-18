import React, { PureComponent, PropTypes } from 'react';

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
            <ons-list>
                <ons-list-header>{date}</ons-list-header>
                <ons-list-item>
                    <div className="center">Дата</div>
                    <div className="right">{date}</div>
                </ons-list-item>
                <ons-list-item>
                    <div className="center">Страницы</div>
                    <div className="right">{pages}</div>
                </ons-list-item>
                <ons-list-item>
                    <div className="center">Скорость чтения</div>
                    <div className="right">{speed} c/м</div>
                </ons-list-item>
                <ons-list-item>
                    <div className="center">Процент</div>
                    <div className="right">{percent}%</div>
                </ons-list-item>
                <ons-list-item>
                    <div className="center">Прогресс</div>
                    <div className="right">{progress}</div>
                </ons-list-item>
                <ons-list-item>
                    <div className="center">Время</div>
                    <div className="right">{formatTime(time)}</div>
                </ons-list-item>
            </ons-list>
        );
    }
}

HistoryDetails.propTypes = {
    item: PropTypes.object.isRequired,
};
