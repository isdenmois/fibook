import { fromJS } from 'immutable';

import {
    selectGlobal,
    selectBookEntities,
    selectBooksByType,
} from '../entities';

const books = {
    book1: {
        status: 0,
        LastAccess: 1,
    },
    book2: {
        status: 1,
        LastAccess: 2,
    },
    book3: {
        status: 0,
        LastAccess: 0,
    },
};

const state = fromJS({
    book: books,
});

const mockedState = {
    entities: state,
    list: fromJS({
        status: 1,
    })
};

describe('select global', () => {
    it('should select global state', () => {
        expect(selectGlobal(mockedState)).toEqual(state);
    });
});

