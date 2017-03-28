import { fromJS } from 'immutable';
import {
    DETAILS_LOADING_START,
    DETAILS_LOADING_SUCCESS,
    DETAILS_LOADING_ERROR,
} from '../constants/actionsTypes/details';

const initialState = fromJS({
    loading: false,
    error: null,
});

/**
 * Details reducer.
 * @param state
 * @param action
 * @returns {any}
 */
export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        case DETAILS_LOADING_START:
            return state
                .set('loading', true)
                .set('error', null);

        case DETAILS_LOADING_SUCCESS:
            return state
                .set('loading', false);

        case DETAILS_LOADING_ERROR:
            return state
                .set('loading', false)
                .set('error', action.error);
    }

    return state;
}
