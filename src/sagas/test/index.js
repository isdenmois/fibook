
describe('Saga runner test', () => {
    jest.mock('redux-saga/effects', () => ({
        fork: jest.fn(),
    }));
    const fork = require('redux-saga/effects').fork;
    const rootSaga = require('../index').default();

    it('should works', () => {
        expect(rootSaga.next().value).toHaveLength(4);
        expect(fork).toHaveBeenCalledTimes(4);
    });
});
