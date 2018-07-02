
import React from 'react';
import { Route } from 'react-router';

import PageMeta from './hoc/PageMeta';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export class Roles {
  static get GUEST() {
    return 1;
  }

  static get USER() {
    return 2;
  }

  static get MANAGER() {
    return 3;
  }

  static get ADMIN() {
    return 4;
  }
}

export const routesData = {
  'sign-in': {
    auth: false,
    component: SignIn,
    path: '/sign-in',
    roles: [Roles.GUEST],
  },
  'sign-up': {
    auth: false,
    component: SignUp,
    path: '/sign-up',
    role: [Roles.GUEST],
  },
};

export const routes = Object.entries(routesData).map(([name, obj]) => (
  <Route key={name} path={obj.path} component={PageMeta(obj.component)} />
));
