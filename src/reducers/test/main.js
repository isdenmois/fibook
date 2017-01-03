import { fromJS } from 'immutable';
import * as actions from '../../actions/main';
import reducer from '../main';

/* global describe, it, expect */
describe('Main reducer', () => {
    it('should return the initial state', () => {
        const state = reducer(undefined, {});
        const expectedState = {
            error: null,
            loading: false,
        };

        expect(state.toJS()).toEqual(expectedState);
    });

    it('should handle loading action', () => {
        const initialState = fromJS({ loading: false, error: 'test error' });
        const expectedState = { loading: true, error: null };
        const action = actions.startLoading();
        const state = reducer(initialState, action).toJS();

        expect(state).toEqual(expectedState);
    });

    it('should handle success loading action', () => {
        const initialState = fromJS({ loading: true });
        const expectedState = { loading: false };
        const action = actions.loadingSuccess();
        const state = reducer(initialState, action).toJS();

        expect(state).toEqual(expectedState);
    });

    it('should handler error loading action', () => {
        const initialState = fromJS({ loading: true });
        const error = 'loading error';
        const expectedState = { loading: false, error };
        const action = actions.loadingError(error);
        const state = reducer(initialState, action).toJS();

        expect(state).toEqual(expectedState);
    });
});
