/**
 * Actions creators for book details.
 */
import {
    CREATE_NEW_BOOK,
    DELETE_BOOK,
    DETAILS_LOADING_START,
    DETAILS_LOADING_SUCCESS,
    DETAILS_LOADING_ERROR,
    UPDATE_BOOK_STATUS,
} from '../constants/actionsTypes/details';

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
 * Delete book by MD5.
 * @param MD5
 */
export function deleteBook(MD5) {
    return {
        type: DELETE_BOOK,
        MD5,
    };
}

/**
 * Load details for book.
 * @param MD5
 */
export function loadDetails(MD5) {
    return {
        type: DETAILS_LOADING_START,
        MD5,
    };
}

/**
 * Details loaded.
 * @param data
 */
export function detailsLoaded(MD5, data) {
    return {
        type: DETAILS_LOADING_SUCCESS,
        MD5,
        data,
    };
}

/**
 * Details not loaded.
 * @param error
 */
export function detailsLoadError(error) {
    return {
        type: DETAILS_LOADING_ERROR,
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
        LastAccess: Date.now(),
    };
}
