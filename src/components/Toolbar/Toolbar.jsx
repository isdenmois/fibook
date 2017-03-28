import React, { PureComponent, PropTypes } from 'react';
import InlineSVG from 'svg-inline-react';
import css from './Toolbar.css';
import backButton from './ios-arrow-back.svg';

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
                        <InlineSVG
                            className={css.icon}
                            src={backButton}
                        />
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
