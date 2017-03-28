import React from 'react';
import { shallow } from 'enzyme';

import Toolbar from './index';

/* global describe, it, jest, expect */
describe('<Toolbar />', () => {
    it('should render', () => {
        const component = shallow(<Toolbar />);
        expect(component.length).toBeTruthy();
    });
});
