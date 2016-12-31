import React from 'react';
import { shallow } from 'enzyme';
import FileImport from './FileInput';

describe('<FileInput />', () => {
    it('should render without errors', () => {
        const fn = jest.fn();
        const file = shallow(<FileImport name="test" onFileSelect={fn} />);
        expect(file).toBeDefined();
    });
});
