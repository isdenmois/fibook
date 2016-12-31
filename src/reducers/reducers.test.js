describe('Index reducer', () => {
    it('should combine reducers', () => {
        const redux = require('redux');
        const combineReducers = jest.fn();
        redux.combineReducers = combineReducers;

        const rootReducer = require('./index').default;
        expect(combineReducers).toHaveBeenCalled();
    });
});
