import { assert } from 'chai';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as companyActions from '../../src/actions/company';
import * as initializationActions from '../../src/actions/initialization';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions > company', () => {
    describe('#clearCompanyData()', () => {
        it('should clear input data', () => {
            const unclear = {id: 5, a: 1, b: 2, _test: 'none', error: false};
            const clear = {id: 5, key:5, a: 1, b: 2};
            assert.deepEqual(companyActions.clearCompanyData(unclear), clear);
        });
    });

    describe('#loadCompanyRequest()', () => {
        it('should create CHANGE_AVAILABILITY_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = companyActions.loadCompanyRequest(payload);
            const actionObject = {
                type: companyActions.LOAD_COMPANY_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#loadCompanySuccess()', () => {
        it('should create LOAD_COMPANY_SUCCESS action', () => {
            const store = mockStore({});
            const payload = {name: 'name', surname: 'surname'};

            const expectedActions = [
                {
                    type: companyActions.LOAD_COMPANY_SUCCESS,
                    error: false,
                    payload
                }
            ];

            store.dispatch(companyActions.loadCompanySuccess(payload));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#loadCompanyFailure()', () => {
        it('should create LOAD_COMPANY_FAILURE action', () => {
            const payload = {message: 'ERROR'};
            const action = companyActions.loadCompanyFailure(payload);
            const actionObject = {
                type: companyActions.LOAD_COMPANY_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Błąd ładowania danych firmy" }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#loadAllCompaniesRequest()', () => {
        it('should create LOAD_ALL_COMPANIES_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = companyActions.loadAllCompaniesRequest(payload);
            const actionObject = {
                type: companyActions.LOAD_ALL_COMPANIES_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#loadAllCompaniesSuccess()', () => {
        it('should create LOAD_ALL_COMPANIES_SUCCESS action', () => {
            const store = mockStore({});
            const payload = {companies: [
                    {id: 1, name: 'Test1'},
                    {id: 2, name: 'Test2'}
                ]
            };

            const expectedActions = [
                {
                    type: companyActions.LOAD_ALL_COMPANIES_SUCCESS,
                    error: false,
                    payload: {
                        companies: [
                            {id: 1, key: 1, name: 'Test1'},
                            {id: 2, key: 2, name: 'Test2'}
                        ]
                    }
                }
            ];

            store.dispatch(companyActions.loadAllCompaniesSuccess(payload));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#loadAllCompaniesFailure()', () => {
        it('should create LOAD_ALL_COMPANIES_FAILURE action', () => {
            const payload = {message: 'ERROR'};
            const action = companyActions.loadAllCompaniesFailure(payload);
            const actionObject = {
                type: companyActions.LOAD_ALL_COMPANIES_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Błąd ładowania listy firm" }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#setActivatedCompanyRequest()', () => {
        it('should create SET_ACTIVATED_COMPANY_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = companyActions.setActivatedCompanyRequest(payload);
            const actionObject = {
                type: companyActions.SET_ACTIVATED_COMPANY_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#setActivatedCompanySuccess()', () => {
        it('should create SET_ACTIVATED_COMPANY_SUCCESS action', () => {
            const store = mockStore({});
            const payload = {id: 1, name: 'Test1', error: false, _test: 'none'};

            const expectedActions = [
                {
                    type: companyActions.SET_ACTIVATED_COMPANY_SUCCESS,
                    error: false,
                    payload: {
                        company: {id: 1, name: 'Test1', key: 1}
                    }
                }
            ];

            store.dispatch(companyActions.setActivatedCompanySuccess(payload));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#setActivatedCompanyFailure()', () => {
        it('should create SET_ACTIVATED_COMPANY_FAILURE action', () => {
            const payload = {message: 'ERROR'};
            const action = companyActions.setActivatedCompanyFailure(payload);
            const actionObject = {
                type: companyActions.SET_ACTIVATED_COMPANY_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Nie udało się aktywować firmy" }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#addMyCompanyRequest()', () => {
        it('should create ADD_MY_COMPANY_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = companyActions.addMyCompanyRequest(payload);
            const actionObject = {
                type: companyActions.ADD_MY_COMPANY_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#addMyCompanySuccess()', () => {
        it('should create ADD_MY_COMPANY_SUCCESS and SET_INITIALIZATION_STEP action', () => {
            const store = mockStore({});
            const payload = {id: 1, name: 'Test1'};

            const expectedActions = [
                {
                    type: companyActions.ADD_MY_COMPANY_SUCCESS,
                    error: false,
                    payload
                },
                {
                    type: initializationActions.SET_INITIALIZATION_STEP,
                    error: false,
                    payload: {
                        step: 3
                    }
                }
            ];

            store.dispatch(companyActions.addMyCompanySuccess(payload));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#addMyCompanyFailure()', () => {
        it('should create ADD_MY_COMPANY_FAILURE action', () => {
            const payload = {message: 'ERROR'};
            const action = companyActions.addMyCompanyFailure(payload);
            const actionObject = {
                type: companyActions.ADD_MY_COMPANY_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Błąd dodawania firmy" }
            };
            assert.deepEqual(action, actionObject);
        });
    });
});