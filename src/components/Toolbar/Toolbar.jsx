import React, { PureComponent, PropTypes } from 'react';
import css from './Toolbar.css';

class Toolbar extends PureComponent {
    constructor(props, context) {
        super(props, context);
        this.goBack = ::this.goBack;
    }

    goBack() {
        const router = this.context.router;
        router.push('/');
    }

    render() {
        return (
            <div className={css.wrapper}>
                {this.props.backButton && (
                    <div
                        className={css.backButton}
                        onClick={this.goBack}
                    >
                        Назад
                    </div>
                )}
                <div className={css.title}>
                    {this.props.title}
                </div>
            </div>
        );
    }
}

Toolbar.propTypes = {
    backButton: PropTypes.bool,
    title: PropTypes.node,
};

Toolbar.contextTypes = {
    router: PropTypes.object,
};

export default Toolbar;
