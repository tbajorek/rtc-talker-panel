import { combineReducers } from 'redux';

import { CHANGE_ROUTE } from '../actions/route';

const currentRoute = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_ROUTE:
      return action.payload.route;
    default:
      return state;
  }
};

const currentName = (state = '', action) => {
  switch (action.type) {
    case CHANGE_ROUTE:
      return action.payload.name;
    default:
      return state;
  }
};

export default combineReducers({ currentRoute, currentName });

export const getCurrentRoute = state => state.route.currentRoute;
export const getCurrentRouteName = state => state.route.currentName;
