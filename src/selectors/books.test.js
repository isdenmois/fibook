import { fromJS } from 'immutable';

import {
    selectGlobal,
    selectLoading,
    selectError,
} from './books';

describe('select global', () => {
    const globalSelector = selectGlobal();

    it('should select global state', () => {
        const globalState = {};
        const mockedState = {
            books: globalState,
        };

        expect(globalSelector(mockedState)).toEqual(globalState);
    });
});


describe('select loading', () => {
    const loadingSelector = selectLoading();

    it('should select loading state', () => {
        const loading = true;
        const mockedState = {
            books: fromJS({
                loading,
            }),
        };

        expect(loadingSelector(mockedState)).toEqual(loading);
    });
});

describe('select error', () => {
    const errorSelector = selectError();

    it('should select error', () => {
        const error = 'test error';
        const mockedState = {
            books: fromJS({
                error,
            }),
        };

        expect(errorSelector(mockedState)).toEqual(error);
    });
});
