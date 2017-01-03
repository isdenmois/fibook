import { fromJS } from 'immutable';

import {
    selectMain,
    selectLoading,
    selectError,
} from '../main';

describe('select main from store', () => {
    it('should select main state', () => {
        const globalState = { loading: true};
        const mockedState = {
            main: globalState,
        };

        expect(selectMain(mockedState)).toEqual(globalState);
    });
});


describe('select loading', () => {
    it('should select loading state', () => {
        const loading = true;
        const mockedState = {
            main: fromJS({
                loading,
            }),
        };

        expect(selectLoading(mockedState)).toEqual(loading);
    });
});

describe('select error', () => {
    it('should select error', () => {
        const error = 'test error';
        const mockedState = {
            main: fromJS({
                error,
            }),
        };

        expect(selectError(mockedState)).toEqual(error);
    });
});
