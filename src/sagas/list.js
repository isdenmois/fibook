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

/**
 * Get books saga.
 */
export function* getBooks() {
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

    const readBooksparams = stringify({
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

    try {
        yield put(startLoading());

        // Load new books.
        const newBooks = yield call(request, `/api/sql?${newBooksParams}`);

        // Load read books.
        const readBooks = yield call(request, `/api/sql?${readBooksparams}`);

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
