import React, { PureComponent, PropTypes } from 'react';
import { BarChart, Bar } from 'recharts';

/* global window */
export default class Chart extends PureComponent {
    render() {
        const width = window.innerWidth;

        return (

            <BarChart
                height={250}
                width={width}
                data={this.props.dataset}
                fill="#4383cd"
            >
                <Bar
                    dataKey="pages"
                    onClick={this.props.onSelect}
                    isAnimationActive={false}
                    maxBarSize={48}
                />
            </BarChart>
        );
    }
}

Chart.propTypes = {
    dataset: PropTypes.array.isRequired,
    onSelect: PropTypes.func,
};
