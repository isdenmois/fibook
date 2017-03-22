import React, { PureComponent, PropTypes } from 'react';

import css from './ListItem.css';

class ListItem extends PureComponent {
    render() {
        return (
            <div
                className={css.listItem}
                onClick={this.props.onClick}
            >
                <div className={css.center}>
                    {this.props.center}
                    {this.props.subtitle && (
                        <div className={css.subtitle}>
                            {this.props.subtitle}
                        </div>
                    )}
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
    subtitle: PropTypes.node,
    right: PropTypes.node,
    onClick: PropTypes.func,
};

export default ListItem;
