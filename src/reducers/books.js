/**
 * Books reducer.
 */
import { fromJS } from 'immutable';
import {
    CREATE_NEW_BOOK,
    LOAD_BOOKS,
    LOAD_BOOKS_ERROR,
    LOAD_BOOKS_SUCCESS,
} from '../constants/books';

// Initial state of books list.
const initialState = fromJS({
    loading: false,
    error: false,
    list: [],
});

/**
 * Books reducer implementation.
 * @param state
 * @param action
 */
function appReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_NEW_BOOK:
        case LOAD_BOOKS:
            return state
                .set('loading', true)
                .set('error', false);

        case LOAD_BOOKS_SUCCESS:
            return state
                .set('loading', false)
                .set('list', action.books);

        case LOAD_BOOKS_ERROR:
            return state
                .set('error', action.error)
                .set('loading', false);
    }

    return state;
}

export default appReducer;
