import React, { PureComponent, PropTypes } from 'react';

import css from './ListItem.css';

class ListItem extends PureComponent {
    render() {
        return (
            <div className={css.listItem}>
                <div className={css.center}>
                    {this.props.center}
                </div>
                {this.props.right && (
                    <div className={css.right}>
                        {this.props.right}
                    </div>
                )}
            </div>
        );
    }
}

ListItem.propTypes = {
    center: PropTypes.node,
    right: PropTypes.node,
};

export default ListItem;
