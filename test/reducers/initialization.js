import { assert } from 'chai';
import createTestStore from '../createTestStore';

import reducer from '../../src/reducers/initialization';
import * as initializationActions from '../../src/actions/initialization';
import * as profileActions from '../../src/actions/profile';

describe('reducers > initialization', () => {
    const initialState = {step: 1};

    it('should return the initial state', () => {
        const returnedState = reducer(undefined, {});
        assert.deepEqual(returnedState, initialState);
    });

    it('should handle SET_INITIALIZATION_STEP action', () => {
        const step = 1;
        const returnedState = reducer(initialState, initializationActions.setInitializationStep(step));
        assert.deepEqual(returnedState, {...initialState, step});
    });

    it('should handle ADD_MY_ADDRESS_SUCCESS action', () => {
        const store = createTestStore(reducer, initialState);
        const data = {
            name: 'name',
            surname: 'surname'
        };

        store.dispatch(profileActions.addMyUserAddressSuccess(data));
        assert.deepEqual(store.getState(), {
            ...initialState,
            step: 2
        });
    });
});