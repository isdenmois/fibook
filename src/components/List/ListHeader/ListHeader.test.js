import React from 'react';
import { shallow } from 'enzyme';

import ListHeader from './index';

/* global describe, it, jest, expect */
describe('<ListHeader />', () => {
    it('should render', () => {
        const component = shallow(<ListHeader />);
        expect(component.length).toBeTruthy();
    });
});
