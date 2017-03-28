import { fork } from 'redux-saga/effects';
import {
    createNewBookWatcher,
    deleteBookWatcher,
    updateBookStatusWatcher,
} from './details';
import {
    loadDetailsWatcher,
} from './loadDetails';
import {
    getBooksWatcher,
} from './list';

export default function* root() {
    yield [
        fork(createNewBookWatcher),
        fork(deleteBookWatcher),
        fork(loadDetailsWatcher),
        fork(getBooksWatcher),
        fork(updateBookStatusWatcher),
    ];
}
