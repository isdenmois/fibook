import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const finalCreateStore = compose(
    applyMiddleware(sagaMiddleware),
)(createStore);

module.exports = function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);
    store.runSaga = sagaMiddleware.run;
    return store;
};
