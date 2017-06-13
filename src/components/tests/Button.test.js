import React from 'react';
import { shallow } from 'enzyme';

import Button from '../Button/index';

/* global describe, it, jest, expect */
describe('<Button />', () => {
    it('should render', () => {
        const component = shallow(<Button />);
        expect(component.length).toBeTruthy();
    });
});
