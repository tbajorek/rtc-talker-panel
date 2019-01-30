import {
    SIGN_IN_FAILURE,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS
} from "../actions/auth";

const initialState = {
    loginLoading: false,
    registerLoading: false,
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_REQUEST:
            return {...state, loginLoading: true};
        case SIGN_IN_SUCCESS:
        case SIGN_IN_FAILURE:
            return {...state, loginLoading: false};
        case SIGN_UP_REQUEST:
            return {...state, registerLoading: true};
        case SIGN_UP_SUCCESS:
        case SIGN_UP_FAILURE:
            return {...state, registerLoading: false};
        default:
            return state;
    }
};

export default auth;

export const isLoginLoading = (state) => state.auth.loginLoading;
export const isRegisterLoading = (state) => state.auth.registerLoading;