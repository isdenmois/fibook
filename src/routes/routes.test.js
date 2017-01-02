import React from 'react';
import { shallow } from 'enzyme';

import Router from './index';

describe('routes', () => {
    it('should render', () => {
        const wrapper = shallow(<Router />);
        expect(wrapper.node).toBeDefined();
    });
});
