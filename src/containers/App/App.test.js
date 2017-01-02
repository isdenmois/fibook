import React from 'react';
import { shallow } from 'enzyme';

import ConnectedApp, { App } from './index';

describe('<App /> component', () => {
    it('should render', () => {
        const loadBooks = jest.fn();
        const app = shallow(<App loadBooks={loadBooks} />);

        expect(loadBooks).not.toHaveBeenCalled();

        app.instance().componentDidMount();
        expect(loadBooks).toHaveBeenCalled();
    });
});
