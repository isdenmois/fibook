import fromGenerator from '../../utils/sagaTest';

import { BOOK_LIST_LOAD } from '../../constants/actionsTypes/list';
import {
    startLoading,
    loadingSuccess,
    loadingError,
} from '../../actions/main';
import request from '../../utils/request';

import {
    getBooks,
    getBooksWatcher,
    newBooksURL,
    readBooksURL,
} from '../list';

describe('getBooksWatcher Saga', () => {
    const getBooksWatcherGenerator = fromGenerator(getBooksWatcher());

    it('should watch for DELETE_BOOK action', () => {
        getBooksWatcherGenerator.forkTakeLatest(BOOK_LIST_LOAD, getBooks);
    });
});

describe('getBooks saga', () => {
    const getBooksGenerator = fromGenerator(getBooks());
    const errBooksGenerator = fromGenerator(getBooks());
    const newBooks = [];
    const readBooks = [{
        MD5: 123
    }];

    it('should put startLoading action', () => {
        getBooksGenerator.next().put(startLoading());
    });

    it('should call request for new books', () => {
        getBooksGenerator.next().call(request, newBooksURL);
    });

    it('should call request for read books', () => {
        getBooksGenerator.next(newBooks).call(request, readBooksURL);
    });

    it('should put loadingSuccess with loaded entities', () => {
        const entities = {
            book: {
                123: readBooks[0],
            }
        };
        getBooksGenerator.next(readBooks).put(loadingSuccess(entities));
    });

    it('should put loadingError', () => {
        const error = new Error('test');

        getBooksGenerator.next();
        getBooksGenerator.throwNext(error).put(loadingError(error));
    });
});
