import { assert } from 'chai';
import createTestStore from '../createTestStore';

import reducer from '../../src/reducers/auth';
import * as authActions from '../../src/actions/auth';
import ActionCreator from "tbrtc-common/utilities/ActionCreator";

describe('reducers > auth', () => {
    const initialState = {
        loginLoading: false,
        registerLoading: false,
    };

    it('should return the initial state', () => {
        const returnedState = reducer(undefined, {});
        assert.deepEqual(returnedState, initialState);
    });

    it('should handle SIGN_IN_REQUEST action', () => {
        const payload = {a: 1, b: 2};
        const returnedState = reducer(initialState, authActions.signInRequest(payload));
        assert.deepEqual(returnedState, {
            ...initialState,
            loginLoading: true
        });
    });

    it('should handle SIGN_IN_SUCCESS action', () => {
        const store = createTestStore(reducer, initialState);
        const data = {
            user: {name: 'name', surname: 'surname'},
            token: 'token',
            validUntil: 'validUntil',
            _requestPayload: {
                remember: true
            }
        };

        store.dispatch(authActions.signInSuccess(data));
        assert.deepEqual(store.getState(), {
            ...initialState,
            loginLoading: false
        });
    });

    it('should handle SIGN_IN_FAILURE action', () => {
        const returnedState = reducer(initialState, authActions.signInFailure({message: 'ERROR'}));
        assert.deepEqual(returnedState, {
            ...initialState,
            loginLoading: false
        });
    });

    it('should handle SIGN_UP_REQUEST action', () => {
        const payload = {a: 1, b: 2};
        const returnedState = reducer(initialState, authActions.signUpRequest(payload));
        assert.deepEqual(returnedState, {
            ...initialState,
            registerLoading: true
        });
    });

    it('should handle SIGN_UP_SUCCESS action', () => {
        const store = createTestStore(reducer, initialState);
        const data = {};

        store.dispatch(authActions.signUpSuccess(data));
        assert.deepEqual(store.getState(), {
            ...initialState,
            registerLoading: false
        });
    });

    it('should handle SIGN_UP_FAILURE action', () => {
        const returnedState = reducer(initialState, authActions.signUpFailure({message: 'ERROR'}));
        assert.deepEqual(returnedState, {
            ...initialState,
            registerLoading: false
        });
    });
});