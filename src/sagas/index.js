import { fork } from 'redux-saga/effects';
import {
    getBooksWatcher,
    updateBookStatusWatcher,
} from './books';

export default function* root() {
    yield [
        fork(getBooksWatcher),
        fork(updateBookStatusWatcher),
    ];
}
