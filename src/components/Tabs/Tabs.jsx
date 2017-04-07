import React, { PureComponent, PropTypes } from 'react';
import InlineSVG from 'svg-inline-react';
import map from 'utils/map';
import Page from '../Page';

import css from './Tabs.css';

class Tabs extends PureComponent {
    constructor(props) {
        super(props);

        this.renderTab = ::this.renderTab;
        this.renderButton = ::this.renderButton;
        this.setActive = ::this.setActive;

        this.tabs = {};
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

    setActive(active) {
        this.tabs[this.state.active].scrollTop = 0;
        this.setState({ active });
    }

    renderTab(data, i) {
        return (
            <div
                ref={tab => (this.tabs[i] = tab)}
                className={this.getClassName(i)}
                key={i}
            >
                {data.content}
            </div>
        );
    }

    renderButton(data, i) {
        const active = this.state.active;
        let icon = data.icon;
        if (active && data.activeIcon) {
            icon = data.activeIcon;
        }

        return (
            <div
                key={i}
                onClick={() => this.setActive(i)}
                className={i === active ? css.buttonActive : css.button}
            >
                <InlineSVG
                    className={css.icon}
                    src={icon}
                />
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
