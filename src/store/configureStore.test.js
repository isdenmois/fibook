describe('configureStore', () => {
    jest.unmock('redux');
    jest.unmock('redux-saga');
    jest.unmock('redux-logger');
    jest.mock('../reducers');

    it('should load configure function', () => {
        const configureStore = require('./configureStore').default;
        expect(typeof configureStore).toEqual('function');
    });
});

describe('configure prod store', () => {
    jest.unmock('redux');
    jest.unmock('redux-saga');
    const configureStore = require('./configureStore.prod').default;

    it('should contain a hook for `sagaMiddleware.run', () => {
        const store = configureStore({});
        expect(typeof store.runSaga).toEqual('function');
    });
});

describe('configure dev store', () => {
    jest.unmock('redux');
    jest.unmock('redux-saga');
    jest.unmock('redux-logger');
    jest.mock('../reducers');
    const configureStore = require('./configureStore.dev').default;
    const rootReducer = require('../reducers');

    it('should contain a hook for `sagaMiddleware.run', () => {
        const store = configureStore({});
        expect(typeof store.runSaga).toEqual('function');
    });
});

