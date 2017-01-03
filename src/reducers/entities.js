import { Map, fromJS } from 'immutable';
import forEach from 'lodash/forEach';

import {
    UPDATE_BOOK_STATUS,
    DELETE_BOOK,
} from '../constants/actionsTypes/details';
import {
    LOADING_SUCCESS,
} from '../constants/actionsTypes/main';

const initialState = new Map();

export default function entitiesReducer(state = initialState, action) {
    let newState = state;

    switch (action.type) {
        case UPDATE_BOOK_STATUS:
            return state
                .setIn(['book', action.MD5, 'status'], action.status);

        case DELETE_BOOK:
            return state
                .deleteIn(['book', action.MD5]);

        case LOADING_SUCCESS:
            forEach(action.entities, (list, type) => {
                newState = state.set(type, fromJS(list));
            });

            return newState;
    }

    return state;
}
