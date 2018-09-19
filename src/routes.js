import React from 'react';
import { Route } from 'react-router';

import { signOut } from './actions/auth';
import PageMeta from './hoc/PageMeta';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyProfile from './pages/MyProfile';
import Availability from './pages/Availability';
import ActiveTalk from './pages/ActiveTalk';
import UsersList from './pages/UsersList';
import DepartmentsList from './pages/DepartmentsList';
import CompaniesList from './pages/CompaniesList';
import Initialization from './pages/Initialization';

export const Roles = {
  get GUEST() {
    return 1;
  },
  get USER() {
    return 2;
  },
    get MANAGER() {
    return 3;
  },
    get ADMIN() {
    return 4;
  }
};

export const routesData = {
  'sign-in': {
    component: SignIn,
    path: '/sign-in',
    roles: [Roles.GUEST],
    default: Roles.GUEST,
    menu: {
        title: "Zaloguj",
        icon: 'login'
    }
  },
  'sign-up': {
    component: SignUp,
    path: '/sign-up',
    roles: [Roles.GUEST],
      menu: {
          title: "Zarejestruj",
          icon: 'user-add'
      }
  },
    'availability': {
        component: Availability,
        path: '/my-availability',
        role: Roles.USER,
        default: [Roles.USER, Roles.MANAGER, Roles.ADMIN],
        menu: {
            title: "Dostępność",
            icon: 'eye-o'
        }
    },
    'my-profile': {
        component: MyProfile,
        path: '/my-profile',
        role: Roles.USER,
        menu: {
            title: "Mój profil",
            icon: 'user'
        }
    },
    'active-talk': {
        component: ActiveTalk,
        path: '/active-talk',
        role: Roles.USER,
    },
    'users-list': {
        component: UsersList,
        path: '/users-list',
        roles: [Roles.USER, Roles.MANAGER, Roles.ADMIN],
        menu: {
            title: "Użytkownicy",
            icon: 'solution'
        }
    },
    'departments-list': {
        component: DepartmentsList,
        path: '/departments-list',
        roles: [Roles.USER, Roles.MANAGER, Roles.ADMIN],
        menu: {
            title: "Departamenty",
            icon: 'bank'
        }
    },
    'companies-list': {
        component: CompaniesList,
        path: '/companies-list',
        role: Roles.ADMIN,
        menu: {
            title: "Firmy",
            icon: 'home'
        }
    },
    'initialization': {
        component: Initialization,
        path: '/initialization',
        role: Roles.USER,
    },
    'sign-out': {
        action: signOut,
        path: '/sign-out',
        roles: [Roles.USER, Roles.MANAGER, Roles.ADMIN],
        menu: {
            title: "Wyloguj",
            icon: 'logout'
        }
    },
};

/**
 * It looks for route naame in the list having path from application
 *
 * @param {string} path
 * @return {object|null}
 */
export const findRouteName = (path) => {
    const key = 'path';
    let foundRouteName = null;
    Object.entries(routesData).some(([name, route]) => {
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
    Object.entries(routesData).some(([name, route]) => {
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
    const foundRoute = routesData[name];
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
    Object.values(routesData).some((route) => {
        if (route.default && ((Array.isArray(route.default) && route.default.indexOf(role) >= 0) || route.default === role)) {
            foundRoute = route;
            return true;
        }
        return false;
    });
    return foundRoute;
};

export const routes = Object.entries(routesData).map(([name, obj]) => (
  <Route key={name} path={obj.path} component={obj.component ? PageMeta(obj.component) : undefined} />
));
