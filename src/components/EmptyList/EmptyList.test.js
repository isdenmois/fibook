import React from 'react';
import { shallow } from  'enzyme';
import EmptyList from './index';

describe('<EmptyList />', () => {
    it('should render', () => {
        const wrapper = shallow(<EmptyList />);

        expect(wrapper).toBeDefined();
    });
});
