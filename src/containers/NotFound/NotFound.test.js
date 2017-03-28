import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './index';

describe('<NotFound />', () => {
    it('should render without errors', () => {
        const node = shallow(<NotFound />);
        expect(node.length).toBeTruthy();
    });
});
