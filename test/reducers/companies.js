import { assert } from 'chai';
import createTestStore from '../createTestStore';

import reducer from '../../src/reducers/companies';
import * as companyActions from '../../src/actions/company';
import * as profileActions from '../../src/actions/profile';

describe('reducers > companies', () => {
    const initialState = {
        list: {},
        loading: false
    };

    it('should return the initial state', () => {
        const returnedState = reducer(undefined, {});
        assert.deepEqual(returnedState, initialState);
    });

    it('should handle LOAD_COMPANY_SUCCESS action', () => {
        const store = createTestStore(reducer, initialState);
        const data = {
            id: 1,
            name: 'name'
        };

        store.dispatch(companyActions.loadCompanySuccess(data));
        assert.deepEqual(store.getState(), {
            ...initialState,
            list: {
                1: data
            }
        });
    });

    it('should handle SAVE_COMPANY_ADDRESS_SUCCESS action', () => {
        const store = createTestStore(reducer, initialState);
        const data = {
            id: 1,
            name: 'name'
        };

        store.dispatch(profileActions.saveCompanyAddressSuccess(data));
        assert.deepEqual(store.getState(), {
            ...initialState,
            list: {
                1: data
            }
        });
    });

    it('should handle LOAD_ALL_COMPANIES_REQUEST action', () => {
        const returnedState = reducer(initialState, companyActions.loadAllCompaniesRequest());
        assert.deepEqual(returnedState, {
            ...initialState,
            loading: true
        });
    });

    it('should handle SET_ACTIVATED_COMPANY_REQUEST action', () => {
        const returnedState = reducer(initialState, companyActions.setActivatedCompanyRequest());
        assert.deepEqual(returnedState, {
            ...initialState,
            loading: true
        });
    });

    it('should handle LOAD_ALL_COMPANIES_SUCCESS action', () => {
        const store = createTestStore(reducer, {...initialState, loading: true});
        const data = {companies: [
            { id: 1, name: 'name1'},
            { id: 3, name: 'name3'},
        ]};

        store.dispatch(companyActions.loadAllCompaniesSuccess(data));
        assert.deepEqual(store.getState(), {
            ...initialState,
            list: {
                1: {...data.companies[0], key: 1},
                3: {...data.companies[1], key: 3},
            }
        });
    });

    it('should handle LOAD_ALL_COMPANIES_FAILURE action', () => {
        const data = {message: 'ERROR'};
        const returnedState = reducer(initialState, companyActions.loadAllCompaniesFailure(data));
        assert.deepEqual(returnedState, {
            ...initialState,
            loading: false
        });
    });

    it('should handle SET_ACTIVATED_COMPANY_FAILURE action', () => {
        const data = {message: 'ERROR'};
        const returnedState = reducer(initialState, companyActions.setActivatedCompanyFailure(data));
        assert.deepEqual(returnedState, {
            ...initialState,
            loading: false
        });
    });

    it('should handle SET_ACTIVATED_COMPANY_SUCCESS action', () => {
        const company = {id: 5, name: 'Test', activated: false};
        const store = createTestStore(reducer, {...initialState, list: {5: company}});


        store.dispatch(companyActions.setActivatedCompanySuccess({...company, activated: true}));
        assert.deepEqual(store.getState(), {
            ...initialState,
            list: {
                5: {...company, activated: true}
            }
        });
    });
});