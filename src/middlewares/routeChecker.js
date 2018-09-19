import { push } from 'react-router-redux';
import {findRoute, defaultRoute, Roles, findRouteByName} from '../routes';
import { getLoggedUser } from '../reducers/loggedUser';
import userChecker from '../utils/userChecker';
import {SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS} from "../actions/auth";
import {setInitializationStep} from "../actions/initialization";

export default store => next => (action) => {
    const state = store.getState();

    if(action.type === '@@router/LOCATION_CHANGE') {
        const route = findRoute(action.payload.pathname);
        if(!route) {
            return next(action);
        }
        const loggedUser = getLoggedUser(state);
        const authorized = userChecker(loggedUser, route);
        if(!authorized) {
            const defaultRouteData = defaultRoute(loggedUser.role);
            return store.dispatch(push(defaultRouteData.path));
        } else if(typeof route.action === 'function') {
            return store.dispatch(route.action());
        } else if(authorized) {
            if(loggedUser.role !== Roles.GUEST && (!loggedUser.address || (!loggedUser.company && userChecker(loggedUser, {role: Roles.MANAGER})))) {
                if(!loggedUser.address) {
                    store.dispatch(setInitializationStep(1));
                } else if(!loggedUser.company && userChecker(loggedUser, {role: Roles.MANAGER})) {
                    store.dispatch(setInitializationStep(2));
                }
                if(action.payload.pathname !== '/initialization') {
                    const initRoute = findRouteByName('initialization');
                    if(initRoute) {
                        store.dispatch(push(initRoute.path));
                    }
                }
            }
        }
    } else if(action.type === SIGN_IN_SUCCESS || action.type === SIGN_OUT_SUCCESS) {
        next(action);
        const loggedUser = getLoggedUser(state);
        const defaultRouteData = defaultRoute(loggedUser.role);
        return store.dispatch(push(defaultRouteData.path));
    }
    return next(action);
};
