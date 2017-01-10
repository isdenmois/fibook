/**
 * Action creators for book list.
 */
import {
    BOOK_LIST_LOAD,
} from '../constants/actionsTypes/list';

/**
 * Load the books.
 */
// eslint-disable-next-line import/prefer-default-export
export function loadBooks() {
    return {
        type: BOOK_LIST_LOAD,
    };
}
