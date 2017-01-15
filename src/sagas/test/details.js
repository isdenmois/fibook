import fromGenerator from '../../utils/sagaTest';

import {
    DELETE_BOOK,
    CREATE_NEW_BOOK,
    UPDATE_BOOK_STATUS,
} from '../../constants/actionsTypes/details';
import {
    createNewBook,
    createNewBookWatcher,
    deleteBook,
    deleteBookWatcher,
    updateBookStatus,
    updateBookStatusWatcher,
} from '../details';
import { startLoading, loadingError } from '../../actions/main';
import request from '../../utils/request';
import bookDataParser from '../../utils/bookData';
import { loadBooks } from '../../actions/list';

describe('createNewBook Saga', () => {
    const file = 'test file';
    const createNewBookGenerator = fromGenerator(createNewBook({ file }));

    it('should put startLoading', () => {
        createNewBookGenerator.next().put(startLoading());
    });

    it('should call bookDataParser for file', () => {
        createNewBookGenerator.next().call(bookDataParser, file);
    });

    it('should call request with appended data', () => {
        const data = {
            author: 'test author',
            title: 'test title',
            image: 'test image',
            imageName: 'test imageName',
        };

        const body = new FormData();
        body.append('author', data.author);
        body.append('file', file);
        body.append('title', data.title);
        body.append('image', data.image);
        body.append('image-name', data.imageName);

        const requestURL = '/api/book';
        const options = {
            method: 'POST',
            body,
        };

        createNewBookGenerator.next(data).call(request, requestURL, options);
    });

    it('should put loadBooks', () => {
        createNewBookGenerator.next().put(loadBooks());
    });

    it('should throw error', () => {
        const error = 'creating book error';
        createNewBookGenerator.throwNext(error).put(loadingError(error));
    });

    it('should not append image', () => {
        const createNewBookWithError = fromGenerator(createNewBook({ file }));
        createNewBookWithError.next().put(startLoading());
        createNewBookWithError.next().call(bookDataParser, file);
        const data = {
            author: 'supertest author',
            title: 'supertest title',
        };

        const body = new FormData();
        body.append('file', file);
        body.append('author', data.author);
        body.append('title', data.title);

        const requestURL = '/api/book';
        const options = {
            method: 'POST',
            body,
        };

        createNewBookWithError.next(data).call(request, requestURL, options);
    });
});

describe('deleteBook Saga', () => {
    const MD5 = 'test';
    const deleteBookGenerator = fromGenerator(deleteBook({ MD5 }));

    it('should call request with DELETE method', () => {
        const requestURL = `/api/book/${MD5}`;
        const options = {
            method: 'DELETE',
        };

        deleteBookGenerator.next().call(request, requestURL, options);
    });

    it('should throw error', () => {
        const error = 'test deleting error';

        deleteBookGenerator.throwNext(error).put(loadingError(error));
    });
});

describe('updateBookStatus Saga', () => {
    const status = 1;
    const MD5 = 'test MD5 for book update';
    const LastAccess = Date.now();
    const updateBookStatusGenerator = fromGenerator(updateBookStatus({
        MD5,
        status,
        LastAccess,
        LastModified: LastAccess,
    }));

    it('should call request', () => {
        const requestURL = '/api/sql/library_metadata';
        const params = JSON.stringify({
            status,
            LastAccess,
            LastModified: LastAccess,
            where: `MD5 = "${MD5}"`,
        });

        const headersSet = jest.fn();
        global.Headers = function () {
            this.set = headersSet;
        };

        const options = {
            body: params,
            headers: new Headers(),
            method: 'PATCH',
        };

        updateBookStatusGenerator.next().call(request, requestURL, options);
        expect(headersSet).toHaveBeenCalledWith('Content-type', 'application/json');
    });

    it('should throw error', () => {
        const error = 'test updateing error';

        updateBookStatusGenerator.throwNext(error).put(loadingError(error));
    });
});

describe('createNewBookWatcher Saga', () => {
    const createNewBookWatcherGenerator = fromGenerator(createNewBookWatcher());

    it('should watch for CREATE_NEW_BOOK action', () => {
        createNewBookWatcherGenerator.forkTakeLatest(CREATE_NEW_BOOK, createNewBook);
    });
});

describe('deleteBookWatcher Saga', () => {
    const deleteBookWatcherGenerator = fromGenerator(deleteBookWatcher());

    it('should watch for DELETE_BOOK action', () => {
        deleteBookWatcherGenerator.forkTakeLatest(DELETE_BOOK, deleteBook);
    });
});

describe('updateBookStatusWatcher Saga', () => {
    const updateBookStatusWatcherGenerator = fromGenerator(updateBookStatusWatcher());

    it('should watch for UPDATE_BOOK_STATUS action', () => {
        updateBookStatusWatcherGenerator.forkTakeLatest(UPDATE_BOOK_STATUS, updateBookStatus);
    });
});
