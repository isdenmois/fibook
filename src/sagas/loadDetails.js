import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

import {
    DETAILS_LOADING_START,
} from '../constants/actionsTypes/details';
import {
    detailsLoaded,
    detailsLoadError,
} from '../actions/details';
import queryParams from '../utils/queryParams';
import request from '../utils/request';
import processBook from '../utils/processBookDetails';

export function getParams(MD5) {
    const params = {
        table: 'library_metadata',
        where: `MD5 = "${MD5}"`,
    };

    return queryParams(params);
}

export function getHistoryParams(MD5) {
    const params = {
        fields: [
            'StartTime as date',
            '(EndTime - StartTime) AS time',
            'Progress AS progress',
        ],
        table: 'library_history',
        where: `MD5 = "${MD5}" AND time > 30000 AND progress <>  "5/5"`,
        order: 'StartTime',
    };

    return queryParams(params);
}

export function* loadDetails({ MD5 }) {
    const params = getParams(MD5);
    const historyParams = getHistoryParams(MD5);
    const requestURL = `/api/sql?${params}`;
    const historyURL = `/api/sql?${historyParams}`;

    try {
        // Load book details.
        const details = yield call(request, requestURL);
        const history = yield call(request, historyURL);

        if (details && details[0]) {
            processBook(details[0], history);
        }

        yield put(detailsLoaded(MD5, details && details[0]));
    } catch (error) {
        yield put(detailsLoadError(error));
    }
}

export function* loadDetailsWatcher() {
    yield fork(takeLatest, DETAILS_LOADING_START, loadDetails);
}
