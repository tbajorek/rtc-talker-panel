import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as ui } from 'redux-ui'

import loggedUser from './loggedUser';
import companies from './companies';
import online from './online';
import talk from './talk';
import auth from './auth';
import users from './users';
import departments from './departments';
import initialization from './initialization';

export const getLocation = (state) => state.router.location;
export const getCurrentPath = (state) => state.router.location.pathname;

export default combineReducers({ router, loggedUser, companies, online, talk, auth, users, departments, initialization, ui });
