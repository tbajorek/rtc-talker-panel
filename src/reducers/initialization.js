import {ADD_MY_ADDRESS_SUCCESS} from "../actions/profile";
import {SET_INITIALIZATION_STEP} from "../actions/initialization";

const initialization = (state = {step: 1}, action) => {
    switch (action.type) {
        case SET_INITIALIZATION_STEP:
            console.log('set step');
            return {...state, step: action.payload.step};
        case ADD_MY_ADDRESS_SUCCESS:
            return {...state, step: 2};
        default:
            return state;
    }
};

export default initialization;

export const getInitStep = state => state.initialization.step;