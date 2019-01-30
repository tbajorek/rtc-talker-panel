import { assert } from 'chai';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as availabilityActions from '../../src/actions/availability';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions > availability', () => {
    describe('#changeAvailabilityRequest()', () => {
        it('should create CHANGE_AVAILABILITY_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = availabilityActions.changeAvailabilityRequest(payload);
            const actionObject = {
                type: availabilityActions.CHANGE_AVAILABILITY_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#changeAvailabilitySuccess()', () => {
        it('should create CHANGE_AVAILABILITY_SUCCESS action', () => {
            const store = mockStore({});
            const data = {name: 'name', surname: 'surname'};

            const expectedActions = [
                {
                    type: availabilityActions.CHANGE_AVAILABILITY_SUCCESS,
                    error: false,
                    payload: data
                }
            ];

            store.dispatch(availabilityActions.changeAvailabilitySuccess(data));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#changeAvailabilityFailure()', () => {
        it('should create CHANGE_AVAILABILITY_FAILURE action', () => {
            const payload = {message: 'ERROR'};
            const action = availabilityActions.changeAvailabilityFailure(payload);
            const actionObject = {
                type: availabilityActions.CHANGE_AVAILABILITY_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Problem ze zmianą dostepności" }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#setOnlineStatus()', () => {
        it('should create CHANGE_STATUS action', () => {
            const action = availabilityActions.setOnlineStatus(true);
            const actionObject = {
                type: availabilityActions.CHANGE_STATUS,
                error: false,
                payload: {
                    online: true
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#setOnlineStatusSuccess()', () => {
        it('should create CHANGE_STATUS_SUCCESS action', () => {
            const action = availabilityActions.setOnlineStatusSuccess(true);
            const actionObject = {
                type: availabilityActions.CHANGE_STATUS_SUCCESS,
                error: false,
                payload: {
                    online: true
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });
});