import { combineReducers } from 'redux';

import mainReducer from './main';
import listReducer from './list';
import entitiesReducer from './entities';

const rootReducer = combineReducers({
    main: mainReducer,
    list: listReducer,
    entities: entitiesReducer,
});

export default rootReducer;
