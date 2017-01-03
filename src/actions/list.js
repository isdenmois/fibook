/**
 * Action creators for book list.
 */
import {
    BOOK_LIST_LOAD,
    BOOK_LIST_STATUS,
} from '../constants/actionsTypes/list';

/**
 * Load the books.
 */
export function loadBooks() {
    return {
        type: BOOK_LIST_LOAD,
    };
}

/**
 * Set filter status for book list.
 */
export function bookListStatus(status) {
    return {
        type: BOOK_LIST_STATUS,
        status,
    };
}
