import React, { PureComponent, PropTypes } from 'react';

import css from './Button.css';

class Button extends PureComponent {
    render() {
        return (
            <div {...this.props} className={css.wrapper}>
                {this.props.children}
            </div>
        );
    }
}

Button.propTypes = {
    children: PropTypes.node,
};

export default Button;
