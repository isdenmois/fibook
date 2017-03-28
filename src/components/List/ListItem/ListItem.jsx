import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'react-router-dom';

import css from './ListItem.css';

class ListItem extends PureComponent {
    render() {
        const Component = this.props.to ? Link : 'div';

        return (
            <Component
                className={css.listItem}
                onClick={this.props.onClick}
                to={this.props.to}
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
            </Component>
        );
    }
}

ListItem.propTypes = {
    center: PropTypes.node,
    subtitle: PropTypes.node,
    right: PropTypes.node,
    onClick: PropTypes.func,
    to: PropTypes.string,
};

export default ListItem;
