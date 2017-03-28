import React from 'react';
import { shallow } from 'enzyme';

import List from './index';
import css from './List.css';

/* global describe, it, jest, expect */
describe('<List />', () => {
    it('should render', () => {
        const list = shallow(<List><div /></List>);
        expect(list.length).toBeTruthy();
        expect(list.prop('className')).toBe(css.list);
    });

    it('should render empty', () => {
        const list = shallow(<List empty={<span />} />);
        expect(list.length).toBeTruthy();
        expect(list.find('span').length).toBe(1);
    });
});
