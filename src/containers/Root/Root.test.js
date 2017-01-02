import React from 'react';
import { shallow } from 'enzyme';

describe('<Root />', () => {
    it('should render dev', () => {
        const Root = require('./index').default;
        const store = {
            subscribe: jest.fn(),
            dispatch: jest.fn(),
            getState: jest.fn(),
        };
        const history = {};

        const wrapper = shallow(<Root history={history} store={store} />);
        expect(wrapper.prop('store')).toEqual(store);
    });

    it('should render prod', () => {
        const Root = require('./Root.prod').default;
        const store = {
            subscribe: jest.fn(),
            dispatch: jest.fn(),
            getState: jest.fn(),
        };
        const history = {};

        const wrapper = shallow(<Root history={history} store={store} />);
        expect(wrapper.prop('store')).toEqual(store);
    });
});
