import { changeRoute } from '../actions/route';
import findRouteName from '../utils/findRouteName';

export default store => next => (action) => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    store.dispatch(changeRoute(findRouteName('path', action.payload.pathname)));
  }
  return next(action);
};
