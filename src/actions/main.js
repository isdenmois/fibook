/**
 * Main app action types.
 */
import {
    LOADING_START,
    LOADING_SUCCESS,
    LOADING_ERROR,
} from '../constants/actionsTypes/main';

/**
 * Start loading action.
 * @returns {object}
 */
export function startLoading() {
    return {
        type: LOADING_START,
    };
}

/**
 * Dispatched when loading end successfully.
 * @param entities
 *
 * @returns {object}
 */
export function loadingSuccess(entities) {
    return {
        type: LOADING_SUCCESS,
        entities,
    };
}

/**
 * Dispatched when loading fails.
 * @param error
 * @returns {{type, error: *}}
 */
export function loadingError(error) {
    return {
        type: LOADING_ERROR,
        error,
    };
}
