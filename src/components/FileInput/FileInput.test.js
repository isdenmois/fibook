import React from 'react';
import { shallow } from 'enzyme';
import FileInput from './index';

describe('<FileInput />', () => {
    const fn = jest.fn();
    const onload = {
        result: 'test result',
    };
    global.FileReader = function () {};
    global.FileReader.prototype.readAsText = function (file) {
        this.onload({
            target: onload,
        });
    };

    const file = shallow(
        <FileInput
            name="test"
            onFileSelect={fn}
        >
            test
        </FileInput>
    );
    const input = file.find('input');

    it('should render without errors', () => {
        expect(file).toBeDefined();
    });

    it('should correctly works when file is not selected', () => {
        const target = {
            files: [],
        };

        input.simulate('change', { target });
        expect(fn).not.toHaveBeenCalled();
    });

    it('should correctly select file', () => {
        const target = {
            files: ['test file'],
        };

        input.simulate('change', { target });
        expect(fn).toHaveBeenCalledWith('test file', onload.result);
    });

    it('should correctly convert file', () => {
        const target = {
            files: ['test file'],
        };
        onload.result = '<xml encoding="windows-1251">';

        input.simulate('change', { target });
        expect(fn).toHaveBeenCalledWith('test file', onload.result);
    });
});
