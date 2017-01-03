import { fromJS } from 'immutable';

import {
    selectList,
    selectStatus,
} from '../list';

describe('select list from store', () => {
    it('should select list state', () => {
        const globalState = ['test list'];
        const mockedState = {
            list: globalState,
        };

        expect(selectList(mockedState)).toEqual(globalState);
    });
});


describe('select status', () => {
    it('should select status state', () => {
        const status = 1;
        const mockedState = {
            list: fromJS({
                status,
            }),
        };

        expect(selectStatus(mockedState)).toEqual(status);
    });
});
