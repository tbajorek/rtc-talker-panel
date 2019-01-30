import { assert } from 'chai';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as departmentsActions from '../../src/actions/departments';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions > departments', () => {
    describe('#setNewDepModalVisibility()', () => {
        it('should create SET_NEW_DEP_MODAL_VISIBILITY action', () => {
            const action = departmentsActions.setNewDepModalVisibility(1, 2);
            const actionObject = {
                type: departmentsActions.SET_NEW_DEP_MODAL_VISIBILITY,
                error: false,
                payload: {
                    visible: 1,
                    loading: 2
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#getDepartmentsRequest()', () => {
        it('should create GET_DEPARTMENTS_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = departmentsActions.getDepartmentsRequest(payload);
            const actionObject = {
                type: departmentsActions.GET_DEPARTMENTS_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#getDepartmentsSuccess()', () => {
        it('should create GET_DEPARTMENTS_SUCCESS action', () => {
            const store = mockStore({});
            const payload = {departments: [
                    {id: 1, name: 'Test1'},
                    {id: 2, name: 'Test2'}
                ], companyId: 5
            };

            const expectedActions = [
                {
                    type: departmentsActions.GET_DEPARTMENTS_SUCCESS,
                    error: false,
                    payload: {
                        departments: [
                            {id: 1, key: 1, name: 'Test1'},
                            {id: 2, key: 2, name: 'Test2'}
                        ], companyId: 5
                    }
                }
            ];

            store.dispatch(departmentsActions.getDepartmentsSuccess(payload));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#getDepartmentsFailure()', () => {
        it('should create GET_DEPARTMENTS_FAILURE action', () => {
            const payload = {message: 'ERROR', _requestPayload: {companyId: 6}};
            const action = departmentsActions.getDepartmentsFailure(payload);
            const actionObject = {
                type: departmentsActions.GET_DEPARTMENTS_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Nie udało się pobrać listy departamentów", companyId: 6 }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#addDepartmentRequest()', () => {
        it('should create ADD_DEPARTMENT_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = departmentsActions.addDepartmentRequest(payload);
            const actionObject = {
                type: departmentsActions.ADD_DEPARTMENT_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#addDepartmentSuccess()', () => {
        it('should create ADD_DEPARTMENT_SUCCESS and SET_NEW_DEP_MODAL_VISIBILITY actions', () => {
            const store = mockStore({});
            const payload = {id: 2, name: 'Test', workers: [1,2], _requestPayload: {
                    companyId: 2
                }
            };

            const expectedActions = [
                {
                    type: departmentsActions.ADD_DEPARTMENT_SUCCESS,
                    error: false,
                    payload: {
                        companyId: 2,
                        id: 2, name: 'Test', workers: [1,2], key: 2
                    }
                }, {
                    type: departmentsActions.SET_NEW_DEP_MODAL_VISIBILITY,
                    error: false,
                    payload: {
                        visible: false,
                        loading: false
                    }
                }
            ];

            store.dispatch(departmentsActions.addDepartmentSuccess(payload));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#addDepartmentFailure()', () => {
        it('should create ADD_DEPARTMENT_FAILURE action', () => {
            const payload = {message: 'ERROR', _requestPayload: {companyId: 6}};
            const action = departmentsActions.addDepartmentFailure(payload);
            const actionObject = {
                type: departmentsActions.ADD_DEPARTMENT_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Nie udało się dodać nowego departamentu", companyId: 6 }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#removeDepartmentRequest()', () => {
        it('should create REMOVE_DEPARTMENT_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = departmentsActions.removeDepartmentRequest(payload);
            const actionObject = {
                type: departmentsActions.REMOVE_DEPARTMENT_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#removeDepartmentSuccess()', () => {
        it('should create REMOVE_DEPARTMENT_SUCCESS action', () => {
            const store = mockStore({});
            const payload = {_requestPayload: {
                    companyId: 1, departmentId: 2
                }
            };

            const expectedActions = [
                {
                    type: departmentsActions.REMOVE_DEPARTMENT_SUCCESS,
                    error: false,
                    payload: {
                        companyId: 1, departmentId: 2
                    }
                }
            ];

            store.dispatch(departmentsActions.removeDepartmentSuccess(payload));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#removeDepartmentFailure()', () => {
        it('should create REMOVE_DEPARTMENT_FAILURE action', () => {
            const payload = {message: 'ERROR', _requestPayload: {companyId: 6}};
            const action = departmentsActions.removeDepartmentFailure(payload);
            const actionObject = {
                type: departmentsActions.REMOVE_DEPARTMENT_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Nie udało się usunąć departamentu", companyId: 6 }
            };
            assert.deepEqual(action, actionObject);
        });
    });
});