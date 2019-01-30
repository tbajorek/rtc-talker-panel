import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

export default (reducer, initialState) => {
    const composeEnhancers = compose;
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(reduxThunk)),
    );
};