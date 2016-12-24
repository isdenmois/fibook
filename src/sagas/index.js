import { fork } from 'redux-saga/effects';
import { getBooksWatcher } from './books';

export default function* root() {
    yield [
        fork(getBooksWatcher),
    ];
}
