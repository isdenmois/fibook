import { fork } from 'redux-saga/effects';
import {
    createNewBookWatcher,
    deleteBookWatcher,
    updateBookStatusWatcher,
} from './details';
import {
    getBooksWatcher,
} from './list';

export default function* root() {
    yield [
        fork(createNewBookWatcher),
        fork(deleteBookWatcher),
        fork(getBooksWatcher),
        fork(updateBookStatusWatcher),
    ];
}
