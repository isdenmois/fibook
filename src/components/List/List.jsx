import React, { PureComponent, PropTypes } from 'react';
import css from './List.css';

class List extends PureComponent {
    render() {
        if (!this.props.children) {
            return this.props.empty;
        }

        return (
            <div className={css.list}>
                {this.props.children}
            </div>
        );
    }
}

List.propTypes = {
    children: PropTypes.node,
    empty: PropTypes.node,
};

export default List;
