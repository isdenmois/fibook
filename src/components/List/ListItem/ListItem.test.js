import React from 'react';
import { shallow } from 'enzyme';

import ListItem from './index';
import css from './ListItem.css';

/* global describe, it, jest, expect */
describe('<ListItem />', () => {
    it('should render', () => {
        const component = shallow(<ListItem />);
        expect(component.length).toBeTruthy();
        expect(component.find(`.${css.center}`).length).toBe(1);
    });

    it('should render right part', () => {
        const component = shallow(<ListItem right="123" />);
        expect(component.find(`.${css.right}`).length).toBe(1);
    });
});
