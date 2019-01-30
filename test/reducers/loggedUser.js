import {assert} from 'chai';
import createTestStore from '../createTestStore';

import reducer from '../../src/reducers/loggedUser';
import * as authActions from '../../src/actions/auth';
import * as profileActions from '../../src/actions/profile';
import * as availabilityActions from '../../src/actions/availability';
import UserModel from "../../src/models/User";

describe('reducers > loggedUser', () => {
    const initialState = UserModel.createGuest();

    it('should return the initial state', () => {
        const returnedState = reducer(undefined, {});
        assert.deepEqual({...returnedState, _id: null}, {...initialState, _id: null});
    });

    const token = 'token-new';
    const userData = {
        id: 'ds58a',
        name: 'name',
        surname: 'surname',
        email: 'email',
        avatar: 'avatar',
        token: null,
        role: 1,
        address: {a: 1, b: 2},
        company: {c: 3, d: 4},
        departments: [],
        availability: [],
        validUntil: 'validUntil'
    };
    const user = new UserModel(
        userData.id, userData.name, userData.surname, userData.email, userData.avatar, token, userData.role,
        userData.address, userData.company, userData.departments, userData.availability, userData.validUntil
    );

    it('should handle LOAD_AUTH_DATA action', () => {
        const returnedState = reducer(initialState, authActions.loadAuthData(userData, token));
        assert.deepEqual(returnedState, user);
    });

    it('should handle SAVE_MY_ADDRESS_SUCCESS action', () => {
        const store = createTestStore(reducer, initialState);
        const data = {...userData, token};

        store.dispatch(profileActions.saveMyAddressSuccess(data));
        assert.deepEqual(store.getState(), user);
    });

    it('should handle CHANGE_AVAILABILITY_SUCCESS action', () => {
        const store = createTestStore(reducer, initialState);
        const data = {...userData, token};

        store.dispatch(availabilityActions.changeAvailabilitySuccess(data));
        assert.deepEqual(store.getState(), user);
    });

    it('should handle SIGN_OUT_SUCCESS action', () => {
        const returnedState = reducer(user, authActions.signOut());
        assert.deepEqual({...returnedState, _id: null}, {...initialState, _id: null});
    });
});