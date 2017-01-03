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
        limit: 20,
    });
    const requestURL = `/api/sql?${params}`;

    try {
        yield put(startLoading());
        const books = yield call(request, requestURL);
        const { entities } = normalize(books, bookArray);

        yield put(loadingSuccess(entities));
    } catch (err) {
        yield put(loadingError(err));
    }
}

export function* getBooksWatcher() {
    yield fork(takeLatest, BOOK_LIST_LOAD, getBooks);
}
