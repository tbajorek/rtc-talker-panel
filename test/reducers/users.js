import { assert } from 'chai';
import createTestStore from '../createTestStore';

import reducer from '../../src/reducers/users';
import * as usersActions from '../../src/actions/users';

describe('reducers > users', () => {
    const initialState = {
        loading: false,
        my: [],
        all: [],
        byCompanies: {}
    };

    it('should return the initial state', () => {
        const returnedState = reducer(undefined, {});
        assert.deepEqual(returnedState, initialState);
    });

    it('should handle GET_MY_USERS_REQUEST action', () => {
        const returnedState = reducer(initialState, usersActions.getMyUsersRequest({}));
        assert.deepEqual(returnedState, {...initialState, loading: true});
    });

    it('should handle GET_MY_USERS_SUCCESS action', () => {
        const store = createTestStore(reducer, initialState);
        const data = {
            users: [
                {id: 1, name: 'name1', surname: 'surname1', key: 1, fullName: 'name1 surname1'},
                {id: 2, name: 'name2', surname: 'surname2', key: 2, fullName: 'name2 surname2'}
            ]
        };

        store.dispatch(usersActions.getMyUsersSuccess(data));
        assert.deepEqual(store.getState(), {
            ...initialState,
            my: data.users
        });
    });

    it('should handle GET_ALL_USERS_REQUEST action', () => {
        const returnedState = reducer(initialState, usersActions.getAllUsersRequest({}));
        assert.deepEqual(returnedState, {...initialState, loading: true});
    });

    it('should handle GET_ALL_USERS_SUCCESS action', () => {
        const store = createTestStore(reducer, initialState);
        const data = {
            users: [
                {id: 1, name: 'name1', surname: 'surname1', key: 1, fullName: 'name1 surname1'},
                {id: 2, name: 'name2', surname: 'surname2', key: 2, fullName: 'name2 surname2'}
            ]
        };

        store.dispatch(usersActions.getAllUsersSuccess(data));
        assert.deepEqual(store.getState(), {
            ...initialState,
            all: data.users
        });
    });

    it('should handle a request for activating user of own company', () => {
        const returnedState = reducer(initialState, usersActions.setMyActivatedRequest({}));
        assert.deepEqual(returnedState, {...initialState, loading: true});
    });

    it('should handle a request for activating user of other than own company', () => {
        const returnedState = reducer(initialState, usersActions.setAllActivatedRequest({}));
        assert.deepEqual(returnedState, {...initialState, loading: true});
    });

    it('should handle UPDATE_MY_USER action', () => {
        const user = {id: 5, name: 'name', surname: 'surname'};
        const returnedState = reducer({...initialState, my: [
                { ...user, name: 'test' }
            ]
        }, usersActions.updateMyUser(user));
        assert.deepEqual(returnedState, {...initialState, my: [
                {...user, key: 5, fullName: 'name surname'}
            ]
        });
    });

    it('should handle UPDATE_ALL_USER action', () => {
        const user = {id: 5, name: 'name', surname: 'surname'};
        const returnedState = reducer({...initialState, all: [
                { ...user, name: 'test' }
            ]
        }, usersActions.updateAllUser(user));
        assert.deepEqual(returnedState, {...initialState, all: [
                {...user, key: 5, fullName: 'name surname'}
            ]
        });
    });

    it('should handle GET_ALL_USERS_SUCCESS action', () => {
        const store = createTestStore(reducer, initialState);
        const data = {
            users: [
                {id: 1, name: 'name1', surname: 'surname1', key: 1, fullName: 'name1 surname1'},
                {id: 2, name: 'name2', surname: 'surname2', key: 2, fullName: 'name2 surname2'}
            ], _requestPayload: {
                companyId: 5
            }
        };

        store.dispatch(usersActions.getUsersForCompSuccess(data));
        assert.deepEqual(store.getState(), {
            ...initialState,
            byCompanies: {
                [data._requestPayload.companyId]: data.users
            }
        });
    });
});