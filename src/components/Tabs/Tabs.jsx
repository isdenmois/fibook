import React, { PureComponent, PropTypes } from 'react';
import map from 'lodash/map';
import Page from '../Page';

import css from './Tabs.css';

class Tabs extends PureComponent {
    constructor(props) {
        super(props);

        this.renderTab = ::this.renderTab;
        this.renderButton = ::this.renderButton;
        this.state = {
            active: 0,
        };
    }

    getClassName(i) {
        const active = this.state.active;
        if (i < active) {
            return css.tabLeft;
        }
        if (i > active) {
            return css.tabRight;
        }

        return css.tabActive;
    }

    renderTab(data, i) {
        return (
            <div
                className={this.getClassName(i)}
                key={i}
            >
                {data.content}
            </div>
        );
    }

    renderButton(data, i) {
        const active = this.state.active;
        return (
            <div
                key={i}
                onClick={() => this.setState({ active: i })}
                className={i === active ? css.buttonActive : css.button}
            >
                {data.title}
            </div>
        );
    }

    render() {
        const active = this.state.active;
        const tab = this.props.data[active];

        return (
            <Page
                tabbar={map(this.props.data, this.renderButton)}
                fixed={tab.fixed}
            >
                {map(this.props.data, this.renderTab)}
            </Page>
        );
    }
}

Tabs.propTypes = {
    data: PropTypes.array.required,
};

export default Tabs;
