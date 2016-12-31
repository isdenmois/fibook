import React from 'react';
import { shallow } from 'enzyme';
import FileInput from './FileInput';

describe('<FileInput />', () => {
    it('should render without errors', () => {
        const fn = jest.fn();
        const file = shallow(
            <FileInput
                name="test"
                onFileSelect={fn}
            >
                test
            </FileInput>
        );
        expect(file).toBeDefined();
    });
});
