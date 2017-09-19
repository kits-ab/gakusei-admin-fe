import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authSession from './auth';

const rootReducer = combineReducers({
    authSession,
    routing: routerReducer
});

export default rootReducer;
