import { fromJS } from 'immutable';

import {
    selectGlobal,
    selectBookEntities,
    selectBooksByType,
} from './entities';

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
};

describe('select global', () => {
    const globalSelector = selectGlobal();

    it('should select global state', () => {
        expect(globalSelector(mockedState)).toEqual(state);
    });
});

describe('select book entities', () => {
    const bookEntitiesSelector = selectBookEntities();

    it('should select book entities', () => {
        expect(bookEntitiesSelector(mockedState)).toEqual(fromJS(books));
    })
});

describe('select book entities with type', () => {
    const booksBy0TypeSelector = selectBooksByType(0);

    it('should select entities with type 0', () => {
        const expected = {
            book1: {
                status: 0,
                LastAccess: 1,
            },
            book3: {
                status: 0,
                LastAccess: 0,
            },
        };
        expect(booksBy0TypeSelector(mockedState).toJS()).toEqual(expected);
    });

    const booksEmptySelector = selectBooksByType(2);
    it('should select empty list', () => {
        const expected = {};

        expect(booksEmptySelector(mockedState).toJS()).toEqual(expected);
    });

    it('should select empty list', () => {
        const expected = {};
        const mockedEmptyState = {
            entities: fromJS({}),
        };

        expect(booksEmptySelector(mockedEmptyState).toJS()).toEqual(expected);
    });
});
