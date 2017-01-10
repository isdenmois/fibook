import { combineReducers } from 'redux';

import mainReducer from './main';
import entitiesReducer from './entities';

const rootReducer = combineReducers({
    main: mainReducer,
    entities: entitiesReducer,
});

export default rootReducer;
