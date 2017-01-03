import * as actions from '../main';
import * as types from '../../constants/actionsTypes/main';

/* global describe, expect, it */
describe('Main actions', () => {
    it('should create an action for start loading', () => {
        const expected = { type: types.LOADING_START };
        expect(actions.startLoading()).toEqual(expected);
    });

    it('should create an action for success loading', () => {
        const entities = {test: 123};
        const expected = {
            type: types.LOADING_SUCCESS,
            entities,
        };

        expect(actions.loadingSuccess(entities)).toEqual(expected);
    });

    it('should create an action for error loading', () => {
        const error = 'test';
        const expected = {
            type: types.LOADING_ERROR,
            error,
        };

        expect(actions.loadingError(error)).toEqual(expected);
    });
});
