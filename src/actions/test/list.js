import * as actions from '../list';
import * as types from '../../constants/actionsTypes/list';

/* global describe, expect, it */
describe('List actions', () => {
    it('should create an action for load books', () => {
        const expectedAction = { type: types.BOOK_LIST_LOAD };
        expect(actions.loadBooks()).toEqual(expectedAction);
    });

    it('should create an action for status changing', () => {
        const status = 2;
        const expected = {
            type: types.BOOK_LIST_STATUS,
            status,
        };

        expect(actions.bookListStatus(status)).toEqual(expected);
    });
});
