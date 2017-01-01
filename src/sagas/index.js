import { fork } from 'redux-saga/effects';
import {
    createNewBookWatcher,
    getBooksWatcher,
    updateBookStatusWatcher,
} from './books';

export default function* root() {
    yield [
        fork(createNewBookWatcher),
        fork(getBooksWatcher),
        fork(updateBookStatusWatcher),
    ];
}
