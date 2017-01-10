import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

import {
    CREATE_NEW_BOOK,
    DELETE_BOOK,
    UPDATE_BOOK_STATUS,
} from '../constants/actionsTypes/details';
import { startLoading } from '../actions/main';
import { loadBooks } from '../actions/list';
import request from '../utils/request';
import bookDataParser from '../utils/bookData';

/**
 * Create new book saga.
 */
export function* createNewBook({ file }) {
    yield put(startLoading());

    const {
        author,
        image,
        imageName,
        title,
    } = yield call(bookDataParser, file);

    /* global FormData */
    const requestURL = '/api/book';
    const body = new FormData();

    body.append('author', author);
    body.append('title', title);
    body.append('file', file);

    if (image) {
        body.append('image', image);
        body.append('image-name', imageName);
    }

    const options = {
        method: 'POST',
        body,
    };

    try {
        yield call(request, requestURL, options);
        yield put(loadBooks());
    } catch (err) {
        console.error(err);
    }
}

export function* deleteBook({ MD5 }) {
    const requestURL = `/api/book/${MD5}`;
    const options = {
        method: 'DELETE',
    };

    try {
        yield call(request, requestURL, options);
    } catch (err) {
        console.error(err);
    }
}

/**
 * Update book status saga.
 * Sends PATCH request to API for change book status.
 * @param MD5
 * @param status
 */
export function* updateBookStatus({ MD5, status }) {
    const requestURL = '/api/sql/library_metadata';
    const params = JSON.stringify({
        status,
        LastAccess: Date.now(),
        where: `MD5 = "${MD5}"`,
    });

    /* global Headers */
    const headers = new Headers();
    headers.set('Content-type', 'application/json');

    const options = {
        body: params,
        headers,
        method: 'PATCH',
    };

    try {
        yield call(request, requestURL, options);
    } catch (err) {
        console.error(err);
    }
}

export function* createNewBookWatcher() {
    yield fork(takeLatest, CREATE_NEW_BOOK, createNewBook);
}

export function* deleteBookWatcher() {
    yield fork(takeLatest, DELETE_BOOK, deleteBook);
}

export function* updateBookStatusWatcher() {
    yield fork(takeLatest, UPDATE_BOOK_STATUS, updateBookStatus);
}
