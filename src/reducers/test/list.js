import { fromJS } from 'immutable';
import * as actions from '../../actions/list';
import reducer from '../list';

/* global describe, it, expect */
describe('Book list reducer', () => {
    it('should return the initial state', () => {
        const expectedState = {
            status: 0,
        };
        const state = reducer(undefined, {});

        expect(state.toJS()).toEqual(expectedState);
    });

    it('should handle book list changing action', () => {
        const initialState = fromJS({ status: 0 });
        const expectedState = { status: 1 };
        const action = actions.bookListStatus(1);
        const state = reducer(initialState, action).toJS();

        expect(state).toEqual(expectedState);
    });
});
