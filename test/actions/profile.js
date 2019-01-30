import { assert } from 'chai';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as profileActions from '../../src/actions/profile';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions > profile', () => {
    describe('#addMyAddressRequest()', () => {
        it('should create ADD_MY_ADDRESS_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = profileActions.addMyAddressRequest(payload);
            const actionObject = {
                type: profileActions.ADD_MY_ADDRESS_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#addMyUserAddressSuccess()', () => {
        it('should create ADD_MY_ADDRESS_SUCCESS action', () => {
            const store = mockStore({});
            const payload = {
                name: 'name', surname: 'surname'
            };

            const expectedActions = [
                {
                    type: profileActions.ADD_MY_ADDRESS_SUCCESS,
                    error: false,
                    payload
                }
            ];

            store.dispatch(profileActions.addMyUserAddressSuccess(payload));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#addMyAddressFailure()', () => {
        it('should create ADD_MY_ADDRESS_FAILURE action', () => {
            const payload = { message: 'ERROR' };
            const action = profileActions.addMyAddressFailure(payload);
            const actionObject = {
                type: profileActions.ADD_MY_ADDRESS_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Błąd dodawania adresu użytkownika" }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#saveAddressRequest()', () => {
        it('should create SAVE_ADDRESS_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = profileActions.saveAddressRequest(payload);
            const actionObject = {
                type: profileActions.SAVE_ADDRESS_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#saveUserAddressSuccess()', () => {
        it('should create SAVE_USER_ADDRESS_SUCCESS action', () => {
            const store = mockStore({});
            const payload = {
                name: 'name', surname: 'surname'
            };

            const expectedActions = [
                {
                    type: profileActions.SAVE_USER_ADDRESS_SUCCESS,
                    error: false,
                    payload
                }
            ];

            store.dispatch(profileActions.saveUserAddressSuccess(payload));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#saveAddressFailure()', () => {
        it('should create SAVE_ADDRESS_FAILURE action', () => {
            const payload = { message: 'ERROR' };
            const action = profileActions.saveAddressFailure(payload);
            const actionObject = {
                type: profileActions.SAVE_ADDRESS_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Błąd zmiany adresu" }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#saveMyAddressSuccess()', () => {
        it('should create SAVE_USER_ADDRESS_SUCCESS action', () => {
            const store = mockStore({});
            const payload = {
                name: 'name', surname: 'surname'
            };

            const expectedActions = [
                {
                    type: profileActions.SAVE_USER_ADDRESS_SUCCESS,
                    error: false,
                    payload
                }, {
                    type: profileActions.SAVE_MY_ADDRESS_SUCCESS,
                    error: false,
                    payload
                }
            ];

            store.dispatch(profileActions.saveMyAddressSuccess(payload));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#saveCompanyAddressSuccess()', () => {
        it('should create SAVE_COMPANY_ADDRESS_SUCCESS action', () => {
            const store = mockStore({});
            const payload = {
                name: 'name'
            };

            const expectedActions = [
                {
                    type: profileActions.SAVE_COMPANY_ADDRESS_SUCCESS,
                    error: false,
                    payload
                }
            ];

            store.dispatch(profileActions.saveCompanyAddressSuccess(payload));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#saveMyCompanyAddressSuccess()', () => {
        it('should create SAVE_MY_COMPANY_ADDRESS_SUCCESS action', () => {
            const store = mockStore({});
            const payload = {
                name: 'name'
            };

            const expectedActions = [
                {
                    type: profileActions.SAVE_COMPANY_ADDRESS_SUCCESS,
                    error: false,
                    payload
                }, {
                    type: profileActions.SAVE_MY_COMPANY_ADDRESS_SUCCESS,
                    error: false,
                    payload
                }
            ];

            store.dispatch(profileActions.saveMyCompanyAddressSuccess(payload));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });
});