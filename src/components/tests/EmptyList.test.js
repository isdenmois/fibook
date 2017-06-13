import React from 'react';
import { shallow } from  'enzyme';
import EmptyList from '../EmptyList/index';

describe('<EmptyList />', () => {
    it('should render', () => {
        const wrapper = shallow(<EmptyList />);

        expect(wrapper).toBeDefined();
    });
});
