/**
 * Gets books from server.
 */
import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { stringify } from 'querystring';

import { LOAD_BOOKS } from '../constants/books';
import { booksLoaded, booksLoadingError } from '../actions/books';
import request from '../utils/request';

export function* getBooks() {
    const params = stringify({
        fields: [
            'MD5',
            'Authors AS author',
            'Title AS title',
            'Status AS status',
        ],
        table: 'library_metadata',
        // where: 'Type IN ("fb2", "epub")',
        order: 'LastModified DESC',
    });
    const requestURL = `/api/sql?${params}`;

    try {
        const repos = yield call(request, requestURL);
        yield put(booksLoaded(repos));
    } catch (err) {
        yield put(booksLoadingError(err));
    }
}

export function* getBooksWatcher() {
    yield fork(takeLatest, LOAD_BOOKS, getBooks);
}
