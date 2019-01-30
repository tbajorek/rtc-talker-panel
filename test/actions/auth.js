import { assert } from 'chai';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as authActions from '../../src/actions/auth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions > auth', () => {
    describe('#loadAuthData()', () => {
        it('should create LOAD_AUTH_DATA action', () => {
            const action = authActions.loadAuthData({a: 1, b: 2}, 'token');
            const actionObject = {
                type: authActions.LOAD_AUTH_DATA,
                error: false,
                payload: {
                    a: 1, b: 2,
                    token: 'token'
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#signInRequest()', () => {
        it('should create SIGN_IN_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = authActions.signInRequest(payload);
            const actionObject = {
                type: authActions.SIGN_IN_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#signInSuccess()', () => {
        it('should create SIGN_IN_SUCCESS and LOAD_AUTH_DATA actions', () => {
            const store = mockStore({});

            const data = {
                user: 'user',
                token: 'token',
                validUntil: 'validUntil',
                _requestPayload: {
                    remember: true
                }
            };
            const expectedActions = [
                { type: authActions.SIGN_IN_SUCCESS, error: false, payload: { user: data.user, token: data.token, validUntil: data.validUntil, remember: data._requestPayload.remember } },
                { type: authActions.LOAD_AUTH_DATA, error: false, payload: { ...data.user, token:data.token} }
            ];
            store.dispatch(authActions.signInSuccess(data));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#signInFailure()', () => {
        it('should create SIGN_IN_FAILURE action', () => {
            const payload = {message: 'ERROR'};
            const action = authActions.signInFailure(payload);
            const actionObject = {
                type: authActions.SIGN_IN_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Problem z logowaniem" }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#signUpRequest()', () => {
        it('should create SIGN_UP_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = authActions.signUpRequest(payload);
            const actionObject = {
                type: authActions.SIGN_UP_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#signUpSuccess()', () => {
        it('should create SIGN_UP_SUCCESS action', () => {
            const store = mockStore({});

            const data = {
                user: 'user',
                token: 'token',
                validUntil: 'validUntil',
                _requestPayload: {
                    remember: true
                }
            };

            store.dispatch(authActions.signInSuccess(data));
            const dispatchedActions = store.getActions();
            assert.equal(dispatchedActions.length, 2);
            assert.isNotNull(dispatchedActions.find((action) => action.type === authActions.SIGN_UP_SUCCESS))
        });
    });

    describe('#signUpFailure()', () => {
        it('should create SIGN_UP_FAILURE action', () => {
            const payload = {message: 'ERROR'};
            const action = authActions.signUpFailure(payload);
            const actionObject = {
                type: authActions.SIGN_UP_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Problem z rejestracją" }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#signOut()', () => {
        it('should create SIGN_OUT_SUCCESS action', () => {
            const action = authActions.signOut();
            const actionObject = {
                type: authActions.SIGN_OUT_SUCCESS,
                error: false,
                payload: {}
            };
            assert.deepEqual(action, actionObject);
        });
    });
});