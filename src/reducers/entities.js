import { fromJS } from 'immutable';
import each from 'utils/each';

import {
    DETAILS_LOADING_SUCCESS,
    UPDATE_BOOK_STATUS,
    DELETE_BOOK,
} from '../constants/actionsTypes/details';
import {
    LOADING_SUCCESS,
} from '../constants/actionsTypes/main';

const initialState = fromJS({
    details: {},
});

export default function entitiesReducer(state = initialState, action) {
    let newState = state;

    switch (action.type) {
        case UPDATE_BOOK_STATUS:
            return state
                .setIn(['book', action.MD5, 'status'], action.status)
                .setIn(['book', action.MD5, 'LastAccess'], action.LastAccess)
                .setIn(['book', action.MD5, 'LastModified'], action.LastAccess);

        case DELETE_BOOK:
            return state
                .deleteIn(['book', action.MD5]);

        case LOADING_SUCCESS:
            each(action.entities, (list, type) => {
                newState = state.set(type, fromJS(list));
            });

            return newState;

        case DETAILS_LOADING_SUCCESS:
            return state
                .setIn(['details', action.MD5], action.data);
    }

    return state;
}
