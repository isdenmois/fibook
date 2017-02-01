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

export function getParams(MD5) {
    const params = {
        table: 'library_metadata',
        where: `MD5 = "${MD5}"`,
    };

    return queryParams(params);
}

export function* loadDetails({ MD5 }) {
    const params = getParams(MD5);
    const requestURL = `/api/sql?${params}`;

    try {
        // Load book details.
        const details = yield call(request, requestURL);
        yield put(detailsLoaded(MD5, details && details[0]));
    } catch (error) {
        yield put(detailsLoadError(error));
    }
}

export function* loadDetailsWatcher() {
    yield fork(takeLatest, DETAILS_LOADING_START, loadDetails);
}
