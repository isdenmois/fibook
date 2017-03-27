import React, { PureComponent, PropTypes } from 'react';
import map from 'lodash/map';

import css from './Timeline.css';
import TimeLineItem from './Item';

class Timeline extends PureComponent {
    renderItem(data) {
        return (
            <div className={css.item} key={data.date}>
                <div className={css.itemDate}>
                    {data.date}
                </div>
                <div className={css.divider} />
                <TimeLineItem
                    progress={data.progress}
                    percent={data.percent}
                    pages={data.pages}
                    speed={data.speed}
                    time={data.time}
                />
            </div>
        );
    }

    render() {
        return (
            <div className={css.wrapper}>
                {map(this.props.data, this.renderItem)}
            </div>
        );
    }
}

Timeline.propTypes = {
    data: PropTypes.array,
};

export default Timeline;
