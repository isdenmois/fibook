import { fork } from 'redux-saga/effects';
import {
    createNewBookWatcher,
    deleteBookWatcher,
    getBooksWatcher,
    updateBookStatusWatcher,
} from './books';

export default function* root() {
    yield [
        fork(createNewBookWatcher),
        fork(deleteBookWatcher),
        fork(getBooksWatcher),
        fork(updateBookStatusWatcher),
    ];
}
