import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';

import {
    DELETE_BOOK,
    CREATE_NEW_BOOK,
    LOAD_BOOKS,
    UPDATE_BOOK_STATUS,
} from '../constants/books';
import {
    createNewBook,
    createNewBookWatcher,
    deleteBook,
    deleteBookWatcher,
    getBooks,
    getBooksWatcher,
    updateBookStatus,
    updateBookStatusWatcher,
} from './books';
import request from '../utils/request';

describe('deleteBook Saga', () => {
    it('should call request with DELETE method', () => {
        const deleteBookGenerator = deleteBook({ MD5: 'test' });
        const requestURL = '/api/book/test';
        const options = { method: 'DELETE' };

        const callDescriptor = deleteBookGenerator.next().value;
        expect(callDescriptor).toEqual(call(request, requestURL, options));
    });
});

describe('createNewBookWatcher Saga', () => {
    const createNewBookWatcherGenerator = createNewBookWatcher();

    it('should watch for CREATE_NEW_BOOK action', () => {
        const takeDescriptor = createNewBookWatcherGenerator.next().value;
        expect(takeDescriptor).toEqual(fork(takeLatest, CREATE_NEW_BOOK, createNewBook));
    });
});

describe('deleteBookWatcher Saga', () => {
    const deleteBookWatcherGenerator = deleteBookWatcher();

    it('should watch for DELETE_BOOK action', () => {
        const takeDescriptor = deleteBookWatcherGenerator.next().value;
        expect(takeDescriptor).toEqual(fork(takeLatest, DELETE_BOOK, deleteBook));
    });
});

describe('getBooksWatcher Saga', () => {
    const getBooksWatcherGenerator = getBooksWatcher();

    it('should watch for DELETE_BOOK action', () => {
        const takeDescriptor = getBooksWatcherGenerator.next().value;
        expect(takeDescriptor).toEqual(fork(takeLatest, LOAD_BOOKS, getBooks));
    });
});


describe('updateBookStatusWatcher Saga', () => {
    const updateBookStatusWatcherGenerator = updateBookStatusWatcher();

    it('should watch for UPDATE_BOOK_STATUS action', () => {
        const takeDescriptor = updateBookStatusWatcherGenerator.next().value;
        expect(takeDescriptor).toEqual(fork(takeLatest, UPDATE_BOOK_STATUS, updateBookStatus));
    });
});
