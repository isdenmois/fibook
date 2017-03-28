import React, { PropTypes, PureComponent } from 'react';
import formatTime from 'utils/formatTime';
import css from './Item.css';

export default class TimelineItem extends PureComponent {
    render() {
        const {
            progress,
            percent,
            pages,
            speed,
            time,
        } = this.props;

        return (
            <div className={css.content}>
                <div className={css.row}>
                    {progress} ({percent}%)
                </div>
                <div className={css.row}>
                    <span>Страниц</span>
                    <span>{pages}</span>
                </div>
                <div className={css.row}>
                    <span>Скорость</span>
                    <span>{speed}</span>
                </div>
                <div className={css.row}>
                    <span>Время</span>
                    <span>{formatTime(time)}</span>
                </div>
            </div>
        );
    }
}

TimelineItem.propTypes = {
    progress: PropTypes.string,
    percent: PropTypes.number,
    pages: PropTypes.number,
    speed: PropTypes.number,
    time: PropTypes.number,
};
