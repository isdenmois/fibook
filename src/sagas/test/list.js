import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';

import {
    BOOK_LIST_LOAD,
} from '../../constants/actionsTypes/list';
import {
    getBooks,
    getBooksWatcher,
} from '../list';

describe('getBooksWatcher Saga', () => {
    const getBooksWatcherGenerator = getBooksWatcher();

    it('should watch for DELETE_BOOK action', () => {
        const takeDescriptor = getBooksWatcherGenerator.next().value;
        expect(takeDescriptor).toEqual(fork(takeLatest, BOOK_LIST_LOAD, getBooks));
    });
});
