import React from 'react';
import { shallow } from 'enzyme';

import Tabs from './index';

/* global describe, it, jest, expect */
describe('<Tabs />', () => {
    it('should render', () => {
        const component = shallow(<Tabs />);
        expect(component.length).toBeTruthy();
    });
});
