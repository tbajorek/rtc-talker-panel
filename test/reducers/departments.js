import { assert } from 'chai';
import createTestStore from '../createTestStore';

import reducer from '../../src/reducers/departments';
import * as departmentsActions from '../../src/actions/departments';

describe('reducers > departments', () => {
    const initialState = {
        data: {},
        modal: {
            loading: false,
            visible: false
        }
    };

    it('should return the initial state', () => {
        const returnedState = reducer(undefined, {});
        assert.deepEqual(returnedState, initialState);
    });

    it('should handle SET_NEW_DEP_MODAL_VISIBILITY action', () => {
        const visible = true;
        const loading = true;
        const returnedState = reducer(initialState, departmentsActions.setNewDepModalVisibility(visible, loading));
        assert.deepEqual(returnedState, {
            ...initialState,
            modal: {
                visible, loading
            }
        });
    });

    it('should handle GET_DEPARTMENTS_REQUEST action', () => {
        const companyId = 5;
        const returnedState = reducer(initialState, departmentsActions.getDepartmentsRequest({companyId}));
        assert.deepEqual(returnedState, {
            ...initialState,
            data: {
                ...initialState.data,
                [companyId]: {loading: true}
            }
        });
    });

    it('should handle GET_DEPARTMENTS_SUCCESS action', () => {
        const store = createTestStore(reducer, initialState);
        const data = {
            departments: [
                {id: 2, name: 'department2'},
                {id: 7, name: 'department7'}
            ], companyId: 4
        };

        store.dispatch(departmentsActions.getDepartmentsSuccess(data));
        assert.deepEqual(store.getState(), {
            ...initialState,
            data: {
                4: {
                    list: [
                        {id: 2, key: 2, name: 'department2', companyId: 4},
                        {id: 7, key: 7, name: 'department7', companyId: 4}
                    ], loading: false
                }
            }
        });
    });

    it('should handle GET_DEPARTMENTS_FAILURE action', () => {
        const companyId = 5;
        const returnedState = reducer(initialState, departmentsActions.getDepartmentsFailure({_requestPayload: {companyId}}));
        assert.deepEqual(returnedState, {
            ...initialState,
            data: {
                ...initialState.data,
                [companyId]: {loading: false}
            }
        });
    });

    it('should handle ADD_DEPARTMENT_SUCCESS action', () => {
        const store = createTestStore(reducer, initialState);
        const data = {id: 1, name: 'name', workers: [
                {id: 2, name: 'name1'},
                {id: 2, name: 'name2'},
            ], _requestPayload: {
            companyId: 87
            }
        };

        store.dispatch(departmentsActions.addDepartmentSuccess(data));
        assert.deepEqual(store.getState(), {...initialState, data: {
            [data._requestPayload.companyId]: {
                list: [{
                    companyId: data._requestPayload.companyId,
                    id: data.id,
                    key: data.id,
                    name: data.name,
                    workers: data.workers
                }], loading: false
            }
        }});
    });

    it('should handle REMOVE_DEPARTMENT_SUCCESS action', () => {
        const companyId = 7;
        const departmentId = 6;
        const store = createTestStore(reducer, {...initialState, data: {
                [companyId]: {
                    list: [{
                        companyId,
                        id: departmentId,
                        key: departmentId,
                        name: 'Name',
                        workers: []
                    }], loading: false
                }
            }});
        const data = {_requestPayload: {
            companyId, departmentId
            }
        };

        store.dispatch(departmentsActions.removeDepartmentSuccess(data));
        assert.deepEqual(store.getState(), {...initialState, data: {
            [companyId]: {
                list: [],
                loading: false
            }
        }});
    });
});