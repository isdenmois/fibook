import { fromJS } from 'immutable';

import {
    selectGlobal,
    selectNewBooks,
    selectReadBooks,
} from '../entities';

const books = {
    book1: {
        MD5: 'book1',
        status: 0,
        LastAccess: 1,
        LastModified: 0,
    },
    book2: {
        MD5: 'book2',
        status: 1,
        LastAccess: 0,
        LastModified: 2,
    },
    book3: {
        MD5: 'book3',
        status: 0,
        LastAccess: 0,
        LastModified: 1,
    },
    book4: {
        MD5: 'book4',
        status: 1,
        LastAccess: 4,
        LastModified: 3,
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

const emptyState = {
    entities: fromJS({})
};

describe('select global', () => {
    it('should select global state', () => {
        expect(selectGlobal(mockedState)).toEqual(state);
    });
});

describe('select new books', () => {
    it('should select new books from global state', () => {
        const expected = [
            fromJS(books.book3),
            fromJS(books.book1),
        ];

        expect(selectNewBooks(mockedState)).toEqual(expected);
    });

    it('should select empty list', () => {
        expect(selectNewBooks(emptyState)).toEqual([]);
    });
});

describe('select read books', () => {
    it('should select new books from global state', () => {
        const expected = [
            fromJS(books.book4),
            fromJS(books.book2),
        ];

        expect(selectReadBooks(mockedState)).toEqual(expected);
    });

    it('should select empty list', () => {
        expect(selectReadBooks(emptyState)).toEqual([]);
    });
});
