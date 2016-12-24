/**
 * Gets books from server.
 */
import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

import { LOAD_BOOKS } from '../constants/books';
import { booksLoaded, booksLoadingError } from '../actions/books';
import request from '../utils/request';

export function* getBooks() {
    const requestURL = '/api/sql';

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
