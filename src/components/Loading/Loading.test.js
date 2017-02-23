/* global describe, it, expect */
import { shallow } from 'enzyme';
import Loading from './index';
import React from 'react';
import css from './Loading.css';

describe('<Loading />', () => {
    it('should rendering', () => {
        const node = shallow(<Loading />);
        expect(node).toBeDefined();
        expect(node.prop('className')).toBe(css.loading);
    });
});
