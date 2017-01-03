import { fromJS } from 'immutable';
import {
    BOOK_LIST_STATUS,
} from '../constants/actionsTypes/list';

const initialState = fromJS({
    status: 0,
});

/**
 * Book list reducer.
 * @param state
 * @param action
 * @returns {any}
 */
export default function listReducer(state = initialState, action) {
    switch (action.type) {
        case BOOK_LIST_STATUS:
            return state.set('status', action.status);
    }
    return state;
}
