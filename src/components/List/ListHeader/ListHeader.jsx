import React, { PureComponent, PropTypes } from 'react';

import css from './ListHeader.css';

class ListHeader extends PureComponent {
    render() {
        return (
            <div className={css.header}>
                {this.props.children}
            </div>
        );
    }
}

ListHeader.propTypes = {
    children: PropTypes.node,
};

export default ListHeader;
