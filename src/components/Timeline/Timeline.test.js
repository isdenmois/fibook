import React from 'react';
import { shallow } from 'enzyme';

import Timeline from './index';

/* global describe, it, jest, expect */
describe('<Timeline />', () => {
    it('should render', () => {
        const component = shallow(<Timeline />);
        expect(component.length).toBeTruthy();
    });
});
