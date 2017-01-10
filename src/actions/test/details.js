import * as actions from '../details';
import * as types from '../../constants/actionsTypes/details';

/* global describe, expect, it */
describe('details actions', () => {
    it('should create an action for update book status', () => {
        const MD5 = '123456';
        const expectedAction = {
            type: types.UPDATE_BOOK_STATUS,
            status: 1,
            MD5,
        };
        const action = actions.updateBookStatus(MD5, 1);
        expectedAction.LastAccess = action.LastAccess;

        expect(action).toEqual(expectedAction);
    });

    it('should create an action for delete the book', () => {
        const MD5 = '123456';
        const expectedAction = {
            type: types.DELETE_BOOK,
            MD5,
        };

        expect(actions.deleteBook(MD5)).toEqual(expectedAction);
    });

    it('should create an action for bookUploading', () => {
        const file = '123456';
        const expectedAction = {
            type: types.CREATE_NEW_BOOK,
            file,
        };

        expect(actions.createNewBook(file)).toEqual(expectedAction);
    });
});
