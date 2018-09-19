import { push } from 'react-router-redux';
import {getLoggedUser} from "../reducers/loggedUser";
import {defaultRoute} from "../routes";

export default store => next => (action) => {
    if (action.type === '@@router/LOCATION_CHANGE') {
        if(action.payload.pathname === '/') {
            const loggedUser = getLoggedUser(store.getState());
            const defRouteObj = defaultRoute(loggedUser.role);
            if(defRouteObj !== null) {
                return store.dispatch(push(defRouteObj.path));
            }
        }
    }
    return next(action);
};