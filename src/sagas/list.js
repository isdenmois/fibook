/**
 * Gets books from server.
 */
import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { stringify } from 'querystring';
import { normalize, Schema, arrayOf } from 'normalizr';

import { BOOK_LIST_LOAD } from '../constants/actionsTypes/list';
import {
    startLoading,
    loadingSuccess,
    loadingError,
} from '../actions/main';
import request from '../utils/request';

/**
 * Define book schema for normalizr.
 */
export const bookSchema = new Schema('book', { idAttribute: 'MD5' });
export const bookArray = arrayOf(bookSchema);

const newBooksParams = stringify({
    'fields[]': [
        'MD5',
        'Authors AS author',
        'Title AS title',
        'ifnull(Status, 0) AS status',
        'LastAccess',
        'LastModified',
    ],
    table: 'library_metadata',
    where: 'Status = 0 OR Status IS NULL',
    order: 'LastModified DESC',
    limit: 50,
});

const readBooksParams = stringify({
    'fields[]': [
        'MD5',
        'Authors AS author',
        'Title AS title',
        'Status AS status',
        'LastAccess',
        'LastModified',
    ],
    table: 'library_metadata',
    where: 'Status = 1',
    order: 'LastAccess DESC',
    limit: 50,
});

export const newBooksURL = `/api/sql?${newBooksParams}`;
export const readBooksURL = `/api/sql?${readBooksParams}`;

/**
 * Get books saga.
 */
export function* getBooks() {
    yield put(startLoading());

    try {

        // Load new books.
        const newBooks = yield call(request, newBooksURL);

        // Load read books.
        const readBooks = yield call(request, readBooksURL);

        // Merge all books.
        const books = [].concat(newBooks).concat(readBooks);
        const { entities } = normalize(books, bookArray);

        yield put(loadingSuccess(entities));
    } catch (err) {
        yield put(loadingError(err));
    }
}

export function* getBooksWatcher() {
    yield fork(takeLatest, BOOK_LIST_LOAD, getBooks);
}
