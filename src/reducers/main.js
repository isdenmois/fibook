import { fromJS } from 'immutable';
import {
    LOADING_START,
    LOADING_SUCCESS,
    LOADING_ERROR,
} from '../constants/actionsTypes/main';

const initialState = fromJS({
    loading: false,
    error: null,
});

/**
 * Main app reducer.
 * @param state
 * @param action
 * @returns {any}
 */
export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING_START:
            return state
                .set('loading', true)
                .set('error', null);

        case LOADING_SUCCESS:
            return state
                .set('loading', false);

        case LOADING_ERROR:
            return state
                .set('loading', false)
                .set('error', action.error);
    }

    return state;
}
