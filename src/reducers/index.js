import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import route from './route';

export const getLocation = (state) => state.router.location;

export default combineReducers({ router, route });
