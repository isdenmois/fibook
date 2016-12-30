/* global describe, it, expect */
import { shallow } from 'enzyme';
import Loading from './index';
import React from 'react';
import { loading } from './Loading.scss';

describe('<Loading />', () => {
    it('should rendering', () => {
        const node = shallow(<Loading />);
        expect(node).toBeDefined();
        expect(node.hasClass(loading)).toBeTruthy();
    });
});
