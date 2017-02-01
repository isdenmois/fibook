import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const finalCreateStore = compose(
    applyMiddleware(sagaMiddleware),
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);
    store.runSaga = sagaMiddleware.run;
    return store;
}
