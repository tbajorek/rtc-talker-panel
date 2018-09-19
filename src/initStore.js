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
