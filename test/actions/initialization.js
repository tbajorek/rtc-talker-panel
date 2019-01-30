import { assert } from 'chai';
import * as initializationActions from "../../src/actions/initialization";

describe('actions > initialization', () => {
    describe('#setInitializationStep()', () => {
        it('should create SET_INITIALIZATION_STEP action', () => {
            const action = initializationActions.setInitializationStep(1);
            const actionObject = {
                type: initializationActions.SET_INITIALIZATION_STEP,
                error: false,
                payload: {
                    step: 1
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });
});