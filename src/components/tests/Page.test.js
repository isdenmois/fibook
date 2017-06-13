import React from 'react';
import { shallow } from 'enzyme';

import Page from '../Page/index';

/* global describe, it, jest, expect */
describe('<Page />', () => {
    it('should render', () => {
        const component = shallow(<Page />);
        expect(component.length).toBeTruthy();
    });
});
