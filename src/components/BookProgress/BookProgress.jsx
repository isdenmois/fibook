import React, { PropTypes, PureComponent } from 'react';
import InlineSVG from 'svg-inline-react';
import svg from './BookProgress.svg';
import css from './BookProgress.css';

export default class BookProgress extends PureComponent {
    render() {
        let progress = this.props.progress || '0/1';
        progress = progress.split('/');
        if (+progress[0] && progress[1] - progress[0] < 5) {
            const lastRead = this.props.lastRead;
            const date = new Date(lastRead).toLocaleDateString();

            return (
                <div className="read">
                    Прочитано {date}
                </div>
            );
        }
        progress = (progress[0] / progress[1]) * 100;

        return (
            <div className={css.progress}>
                <InlineSVG
                    className={css.wrapper}
                    src={svg}
                    style={{ left: `${progress - 100}%` }}
                />
            </div>
        );
    }
}

BookProgress.propTypes = {
    progress: PropTypes.string,
    lastRead: PropTypes.number,
};

BookProgress.defaultProps = {
    progress: '0/1',
};
