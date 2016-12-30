/**
 * Gets books from server.
 */
import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { stringify } from 'querystring';
import { normalize, Schema, arrayOf } from 'normalizr';

import { LOAD_BOOKS } from '../constants/books';
import { booksLoaded, booksLoadingError } from '../actions/books';
import request from '../utils/request';

/**
 * Define book schema for normalizr.
 */
export const bookSchema = new Schema('book', { idAttribute: 'MD5' });
export const bookArray = arrayOf(bookSchema);

export function* getBooks() {
    const params = stringify({
        fields: [
            'MD5',
            'Authors AS author',
            'Title AS title',
            'Status AS status',
            'LastAccess',
        ],
        table: 'library_metadata',
        // where: 'Type IN ("fb2", "epub")',
        order: 'LastAccess DESC',
        limit: 100,
    });
    const requestURL = `/api/sql?${params}`;

    try {
        const books = yield call(request, requestURL);
        const { result, entities } = normalize(books, bookArray);

        yield put(booksLoaded(result, entities));
    } catch (err) {
        yield put(booksLoadingError(err));
    }
}

export function* getBooksWatcher() {
    yield fork(takeLatest, LOAD_BOOKS, getBooks);
}
