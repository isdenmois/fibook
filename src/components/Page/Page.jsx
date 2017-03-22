import React, { PureComponent, PropTypes } from 'react';
import map from 'lodash/map';

import css from './Page.css';

class Page extends PureComponent {
    constructor(props) {
        super(props);

        this.handleClick = ::this.handleClick;
        this.renderTabButton = ::this.renderTabButton;

        this.state = {
            tab: 0,
        };
    }

    handleClick(event) {
        this.setState({ tab: +event.currentTarget.dataset.index });
    }

    renderTabButton(data, index) {
        let className = css.tab;
        if (this.state.tab === index) {
            className = `${css.tab} ${css.tabSelected}`;
        }

        return (
            <div
                className={className}
                key={index}
                data-index={index}
                onClick={this.handleClick}
            >
                {data.label}
            </div>
        );
    }

    render() {
        return (
            <div className={css.page}>
                {this.props.fixed}
                {this.props.toolbar && (
                    <div className={css.toolbar}>
                        {this.props.toolbar}
                    </div>
                )}
                <div className={css.content}>
                    {this.props.children}
                </div>
                {
                    this.props.tabs && (
                        <div className={css.tabs}>
                            {map(this.props.tabs, this.renderTabButton)}
                        </div>
                    )
                }
                {
                    this.props.tabbar && (
                        <div className={css.tabs}>
                            {this.props.tabbar}
                        </div>
                    )
                }
            </div>
        );
    }
}

Page.propTypes = {
    children: PropTypes.node,
    toolbar: PropTypes.node,
    tabbar: PropTypes.node,
    fixed: PropTypes.node,
    tabs: PropTypes.array,
};

export default Page;
