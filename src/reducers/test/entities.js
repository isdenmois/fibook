import { fromJS } from 'immutable';
import reducer from '../entities';
import {
    loadingSuccess,
} from '../../actions/main';
import {
    createNewBook,
    updateBookStatus,
    deleteBook,
} from '../../actions/details';

describe('Books reducer', () => {
    it('should return the initial state', () => {
        const state = reducer(undefined, {});
        const expectedState = {};

        expect(state.toJS()).toEqual(expectedState);
    });

    it('should handle update book status action', () => {
        const action = updateBookStatus(1234, 1);
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

    it('should handle delete book action', () => {
        const action = deleteBook('1234');
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
            }
        };

        expect(state.toJS()).toEqual(expectedState);
    });

    it('should add entities', () => {
        const action = loadingSuccess({
            test: {
                t1: {
                    status: 2,
                }
            }
        });
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
