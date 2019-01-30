import { assert } from 'chai';

import reducer from '../../src/reducers/online';
import * as availabilityActions from '../../src/actions/availability';

describe('reducers > online', () => {
    const initialState = {loading: false, value: false};

    it('should return the initial state', () => {
        const returnedState = reducer(undefined, {});
        assert.deepEqual(returnedState, initialState);
    });

    it('should handle CHANGE_STATUS action', () => {
        const online = !initialState.value;
        const returnedState = reducer(initialState, availabilityActions.setOnlineStatus(online));
        assert.deepEqual(returnedState, {...initialState, loading: true});
    });

    it('should handle CHANGE_STATUS_SUCCESS action', () => {
        const online = !initialState.value;
        const returnedState = reducer(initialState, availabilityActions.setOnlineStatusSuccess(online));
        assert.deepEqual(returnedState, {...initialState, loading: false, value: online});
    });
});