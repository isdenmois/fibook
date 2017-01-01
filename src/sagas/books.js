/**
 * Gets books from server.
 */
import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { stringify } from 'querystring';
import { normalize, Schema, arrayOf } from 'normalizr';

import {
    CREATE_NEW_BOOK,
    LOAD_BOOKS,
    UPDATE_BOOK_STATUS,
} from '../constants/books';
import { booksLoaded, booksLoadingError } from '../actions/books';
import request from '../utils/request';
import BookParser from '../utils/BookParser';
import base64 from '../utils/base64';

/**
 * Define book schema for normalizr.
 */
export const bookSchema = new Schema('book', { idAttribute: 'MD5' });
export const bookArray = arrayOf(bookSchema);

/**
 * Create new book saga.
 */
export function* createNewBook({ contents, file }) {
    const book = new BookParser(contents);
    const {
        author,
        image: imageData,
        title,
    } = book;
    let image;

    /* global FormData */
    const requestURL = '/api/book';
    const body = new FormData();

    body.append('author', author);
    body.append('title', title);
    body.append('file', file);

    if (imageData && imageData.data) {
        image = base64(imageData.data, imageData.type);
        image.lastModifiedDate = new Date();

        body.append('image', image);
    }

    const options = {
        method: 'POST',
        body,
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

export function* getBooksWatcher() {
    yield fork(takeLatest, LOAD_BOOKS, getBooks);
}

export function* updateBookStatusWatcher() {
    yield fork(takeLatest, UPDATE_BOOK_STATUS, updateBookStatus);
}
