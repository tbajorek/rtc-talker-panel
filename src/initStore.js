import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducer from './reducers';

import routeChecker from './middlewares/routeChecker';
import errorHandler from './middlewares/errorHandler';
import sessionStorage from './middlewares/sessionStorage';
import talkEngine from "./middlewares/talkEngine";
import homepage from "./middlewares/homepage";
import {initRoutesData} from "./routes";
import SignIn from "./pages/SignIn";
import {Roles} from "./roles";
import SignUp from "./pages/SignUp";
import Availability from "./pages/Availability";
import MyProfile from "./pages/MyProfile";
import ActiveTalk from "./pages/ActiveTalk";
import UsersList from "./pages/UsersList";
import DepartmentsList from "./pages/DepartmentsList";
import CompaniesList from "./pages/CompaniesList";
import Initialization from "./pages/Initialization";
import {signOut} from "./actions/auth";

initRoutesData({
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
    roles: [Roles.MANAGER, Roles.ADMIN],
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
});

const initStore = (initialState) => {
  const history = createHistory();
  const routerMid = routerMiddleware(history);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return {
    store: createStore(
      reducer,
      initialState,
      composeEnhancers(applyMiddleware(sessionStorage, errorHandler, routeChecker, talkEngine, homepage, reduxThunk, routerMid)),
    ),
    history,
  };
};

export default initStore;
