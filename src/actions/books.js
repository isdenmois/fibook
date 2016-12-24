/**
 * Books actions.
 */
import {
    LOAD_BOOKS,
    LOAD_BOOKS_SUCCESS,
    LOAD_BOOKS_ERROR,
} from '../constants/books';

/**
 * Load the books.
 */
export function loadBooks() {
    return {
        type: LOAD_BOOKS,
    };
}

/**
 * Dispatched when books loaded.
 *
 * @param {array} bookList
 *
 * @returns {object}
 */
export function booksLoaded(bookList) {
    return {
        type: LOAD_BOOKS_SUCCESS,
        books: bookList,
    };
}

/**
 * Dispatched when loading the books fails.
 * @param error
 * @returns {{type, error: *}}
 */
export function booksLoadingError(error) {
    return {
        type: LOAD_BOOKS_ERROR,
        error,
    };
}
