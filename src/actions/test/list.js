import * as actions from '../list';
import * as types from '../../constants/actionsTypes/list';

/* global describe, expect, it */
describe('List actions', () => {
    it('should create an action for load books', () => {
        const expectedAction = { type: types.BOOK_LIST_LOAD };
        expect(actions.loadBooks()).toEqual(expectedAction);
    });
});
