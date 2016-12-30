/* global describe, it, expect */
import * as actions from './books';
import * as types from '../constants/books';

describe('Books actions', () => {
    it('should create an action for load books', () => {
        const expectedAction = { type: types.LOAD_BOOKS };
        expect(actions.loadBooks()).toEqual(expectedAction);
    });

    it('should create an action for success loaded books', () => {
        const books = [1, 2];
        const entities = {1: 1, 2: 2};
        const expectedAction = {
            type: types.LOAD_BOOKS_SUCCESS,
            books,
            entities,
        };

        expect(actions.booksLoaded(books, entities)).toEqual(expectedAction);
    });

    it('should create an action for error loading books', () => {
        const error = 'test error';
        const expectedAction = {
            type: types.LOAD_BOOKS_ERROR,
            error,
        };

        expect(actions.booksLoadingError(error)).toEqual(expectedAction);
    });

    it('should create an action for update book status', () => {
        const MD5 = '123456';
        const expectedAction = {
            type: types.UPDATE_BOOK_STATUS,
            status: 1,
            MD5,
        };

        expect(actions.updateBookStatus(MD5, 1)).toEqual(expectedAction);
    });
});
