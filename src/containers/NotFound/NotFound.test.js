import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './index';
import { notFound } from './NotFound.scss';

describe('<NotFound />', () => {
    it('should render without errors', () => {
        const node = shallow(<NotFound />);
        expect(node.hasClass(notFound)).toBeTruthy();
    });
});
