import { routesData } from '../routes';

export const CHANGE_ROUTE = 'CHANGE_ROUTE';

export const changeRoute = routeName => (dispatch, getState) => {
  dispatch({ type: CHANGE_ROUTE, payload: { route: routesData[routeName], name: routeName } });
};
