import { fromJS } from 'immutable';
import reducer from './books';
import * as types from '../constants/books';

describe('Books reducer', () => {
    it('should return the initial state', () => {
        const state = reducer(undefined, {});
        const expectedState = {
            error: false,
            loading: false,
            list: [],
        };

        expect(state.toJS()).toEqual(expectedState);
    });

    it('should handle LOAD_BOOKS action', () => {
        const action = { type: types.LOAD_BOOKS };
        const initialState = fromJS({
            error: true,
            loading: false,
        });
        const state = reducer(initialState, action);
        const expectedState = {
            error: false,
            loading: true,
        };

        expect(state.toJS()).toEqual(expectedState);
    });


    it('should handle CREATE_NEW_BOOK action', () => {
        const action = { type: types.CREATE_NEW_BOOK };
        const initialState = fromJS({
            error: true,
            loading: false,
        });
        const state = reducer(initialState, action);
        const expectedState = {
            error: false,
            loading: true,
        };

        expect(state.toJS()).toEqual(expectedState);
    });

    it('should handle LOAD_BOOKS_SUCCESS action', () => {
        const bookList = [1, 2, 4];
        const action = {
            type: types.LOAD_BOOKS_SUCCESS,
            books: bookList,
        };
        const initialState = fromJS({
            loading: true,
            list: [],
        });
        const state = reducer(initialState, action);
        const expectedState = {
            loading: false,
            list: bookList,
        };

        expect(state.toJS()).toEqual(expectedState);
    });

    it('should handle LOAD_BOOKS_ERROR action', () => {
        const error = 'test error';
        const action = {
            type: types.LOAD_BOOKS_ERROR,
            error,
        };
        const initialState = fromJS({
            loading: true,
            error: false,
        });
        const state = reducer(initialState, action);
        const expectedState = {
            loading: false,
            error,
        };

        expect(state.toJS()).toEqual(expectedState);
    });
});
