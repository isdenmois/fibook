/**
 * Actions creators for book details.
 */
import {
    CREATE_NEW_BOOK,
    DELETE_BOOK,
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
