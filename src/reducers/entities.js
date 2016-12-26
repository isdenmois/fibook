import { Map, fromJS } from 'immutable';
import forEach from 'lodash/forEach';

import { UPDATE_BOOK_STATUS } from '../constants/books';

const initialState = new Map();

export default function entitiesReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_BOOK_STATUS:
            return state
                .setIn(['book', action.MD5, 'status'], action.status);
    }

    if (action.entities) {
        let newState = state;
        forEach(action.entities, (list, type) => {
            newState = state.set(type, fromJS(list));
        });

        return newState;
    }

    return state;
}
