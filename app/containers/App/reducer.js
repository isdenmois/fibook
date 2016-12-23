/**
 * App reducer.
 */
import { fromJS } from 'immutable';
import {
    LOAD_BOOKS,
    LOAD_BOOKS_ERROR,
    LOAD_BOOKS_SUCCESS
} from './constants';

// Initial state of App.
const initialState = fromJS({
    loading: false,
    error: false,
});

function appReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_BOOKS:
            return state
                .set('loading', true)
                .set('error', false);

        case LOAD_BOOKS_SUCCESS:
            return state
                .set('loading', false);

        case LOAD_BOOKS_ERROR:
            return state
                .set('error', action.error)
                .set('loading', false);

    }

    return state;
}

export default appReducer;
