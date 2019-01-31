import React from 'react';
import { Route } from 'react-router';
import PageMeta from './hoc/PageMeta';
import {Roles} from './roles';

const routesData = {
    data: {}
};

export const initRoutesData = (data) => {
    routesData.data = data;
};

export const getRoutes = () => routesData.data;

/**
 * It looks for route naame in the list having path from application
 *
 * @param {string} path
 * @return {object|null}
 */
export const findRouteName = (path) => {
    const key = 'path';
    let foundRouteName = null;
    Object.entries(routesData.data).some(([name, route]) => {
        if (route[key] === path) {
            foundRouteName = name;
            return true;
        }
        return false;
    });
    return foundRouteName;
};

/**
 * It looks for route data in the list having path from application
 *
 * @param {string} path
 * @return {object|null}
 */
export const findRoute = (path) => {
    const key = 'path';
    let foundRoute = null;
    Object.entries(routesData.data).some(([name, route]) => {
        if (route[key] === path) {
            foundRoute = route;
            return true;
        }
        return false;
    });
    return foundRoute;
};

/**
 * It returns route based on the passed name if it exists
 *
 * @param {string} name Route name
 * @return {object|null}
 */
export const findRouteByName = name => {
    const foundRoute = routesData.data[name];
    return !!foundRoute ? foundRoute : null;
};

/**
 *
 * @return {*}
 */
export const defaultRoute = (role) => {
  let foundRoute = null;
  if(!role) {
      role = Roles.GUEST;
  }
    Object.values(routesData.data).some((route) => {
        if (route.default && ((Array.isArray(route.default) && route.default.indexOf(role) >= 0) || route.default === role)) {
            foundRoute = route;
            return true;
        }
        return false;
    });
    return foundRoute;
};

export const routes = () => Object.entries(routesData.data).map(([name, obj]) => (
    <Route key={name} path={obj.path} component={obj.component ? PageMeta(obj.component) : undefined} />
));
