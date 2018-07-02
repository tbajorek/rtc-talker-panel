import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducer from './reducers';

import authChecker from './middlewares/authChecker';
import routeChecker from './middlewares/routeChecker';

const initStore = (initialState) => {
  const history = createHistory();
  const routerMid = routerMiddleware(history);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return {
    store: createStore(
      reducer,
      initialState,
      composeEnhancers(applyMiddleware(routeChecker, authChecker, reduxThunk, routerMid)),
    ),
    history,
  };
};

export default initStore;
