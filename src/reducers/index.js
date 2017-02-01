import { combineReducers } from 'redux';

import mainReducer from './main';
import entitiesReducer from './entities';
import detailsReducer from './details';

const rootReducer = combineReducers({
    main: mainReducer,
    entities: entitiesReducer,
    details: detailsReducer,
});

export default rootReducer;
