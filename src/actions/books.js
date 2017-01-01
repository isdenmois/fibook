/**
 * Books actions.
 */
import {
    LOAD_BOOKS,
    LOAD_BOOKS_SUCCESS,
    LOAD_BOOKS_ERROR,
    UPDATE_BOOK_STATUS,
    CREATE_NEW_BOOK,
} from '../constants/books';

/**
 * Create new book from FB2.
 * @param file
 * @returns {{type, file: *}}
 */
export function createNewBook(file) {
    return {
        type: CREATE_NEW_BOOK,
        file,
    };
}

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
 * @param entities
 *
 * @returns {object}
 */
export function booksLoaded(bookList, entities) {
    return {
        type: LOAD_BOOKS_SUCCESS,
        books: bookList,
        entities,
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

/**
 * Update book status.
 * @param MD5
 * @param status
 */
export function updateBookStatus(MD5, status) {
    return {
        type: UPDATE_BOOK_STATUS,
        MD5,
        status,
    };
}
