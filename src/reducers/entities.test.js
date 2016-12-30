import { fromJS } from 'immutable';
import reducer from './entities';
import * as types from '../constants/books';

describe('Books reducer', () => {
    it('should return the initial state', () => {
        const state = reducer(undefined, {});
        const expectedState = {};

        expect(state.toJS()).toEqual(expectedState);
    });

    it('should handle UPDATE_BOOK_STATUS action', () => {
        const action = {
            type: types.UPDATE_BOOK_STATUS,
            MD5: '1234',
            status: 1,
        };
        const initialState = fromJS({
            book: {
                123: {
                    status: 0,
                },
                1234: {
                    status: 0,
                },
            }
        });
        const state = reducer(initialState, action);
        const expectedState = {
            book: {
                123: {
                    status: 0,
                },
                1234: {
                    status: 1,
                },
            }
        };

        expect(state.toJS()).toEqual(expectedState);
    });

    it('should add entities', () => {
        const action = {
            entities: {
                test: {
                    t1: {
                        status: 2,
                    }
                }
            }
        };
        const initialState = fromJS({
            book: {
                b1: {
                    status: 1,
                }
            }
        });
        const state = reducer(initialState, action);
        const expectedState = {
            book: {
                b1: {
                    status: 1,
                }
            },
            test: {
                t1: {
                    status: 2,
                }
            },
        };

        expect(state.toJS()).toEqual(expectedState);
    });
});
