/**
 * Gets books from server.
 */
import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { stringify } from 'querystring';
import { normalize, Schema, arrayOf } from 'normalizr';

import {
    CREATE_NEW_BOOK,
    DELETE_BOOK,
    LOAD_BOOKS,
    UPDATE_BOOK_STATUS,
} from '../constants/books';
import {
    booksLoaded,
    booksLoadingError,
    loadBooks,
} from '../actions/books';
import request from '../utils/request';
import bookDataParser from '../utils/bookData';

/**
 * Define book schema for normalizr.
 */
export const bookSchema = new Schema('book', { idAttribute: 'MD5' });
export const bookArray = arrayOf(bookSchema);

/**
 * Create new book saga.
 */
export function* createNewBook({ file }) {
    const {
        author,
        image,
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
 * Get books saga.
 */
export function* getBooks() {
    const params = stringify({
        'fields[]': [
            'MD5',
            'Authors AS author',
            'Title AS title',
            'Status AS status',
            'LastAccess',
            't._data AS thumbnail',
        ],
        table: 'library_metadata',
        'joins[]': [
            'library_thumbnail|t|t.Source_MD5 = tbl.MD5 AND t.Thumbnail_Kind="Original"',
        ],
        // where: 'Type = "fb2"',
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

export function* getBooksWatcher() {
    yield fork(takeLatest, LOAD_BOOKS, getBooks);
}

export function* updateBookStatusWatcher() {
    yield fork(takeLatest, UPDATE_BOOK_STATUS, updateBookStatus);
}
