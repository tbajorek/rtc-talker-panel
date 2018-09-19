import { push } from 'react-router-redux';
import Requester from "tbrtc-common/utilities/Requester";
import ActionCreator from "tbrtc-common/utilities/ActionCreator";
import Messages from '../utils/Messages';
import {findRouteByName} from "../routes";

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const LOAD_AUTH_DATA = 'LOAD_AUTH_DATA';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';

export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';

export const loadAuthData = (user, token) => {
    return ActionCreator.createAction(LOAD_AUTH_DATA, { user, token });
};

export const signInRequest = (payload) => {
    return ActionCreator.createAction(SIGN_IN_REQUEST, { ...payload });
};

export const signInSuccess = (data) => {
    const { user, token, validUntil } = data;
    return (dispatch) => {
        Messages.success('Zostałeś zalogowany jako '+user.name+' '+user.surname);
        dispatch(ActionCreator.createAction(SIGN_IN_SUCCESS, { user, token, validUntil, remember: data._requestPayload.remember }));
        dispatch(ActionCreator.createAction(LOAD_AUTH_DATA, { ...user, token }));
    }
};

export const signInFailure = (data) => {
    return ActionCreator.createErrorAction(SIGN_IN_FAILURE, { message: data.message, title: "Problem z logowaniem" });
};

export const signIn = (email, password, remember) => (dispatch, getState) => {
    return Requester.post('/user/session', [200,201], {email, password, remember}, {
        request: signInRequest,
        success: signInSuccess,
        error: signInFailure
    })(dispatch);
};

export const signUpRequest = (payload) => {
    return ActionCreator.createAction(SIGN_UP_REQUEST, { ...payload });
};

export const signUpSuccess = (data) => {
    return (dispatch) => {
        Messages.success('Zostałeś zarejestrowany');
        dispatch(ActionCreator.createAction(SIGN_UP_SUCCESS));
        const route = findRouteByName('sign-in');
        if(route) {
            dispatch(push(route.path));
        } else {
            Messages.error('Nie można przekierować do strony logowania. Proszę zrobić to ręcznie.');
        }
    }
};

export const signUpFailure = (data) => {
    return ActionCreator.createErrorAction(SIGN_UP_FAILURE, { message: data.message, title: "Problem z rejestracją" });
};

export const signUp = (registerData) => (dispatch, getState) => {
    const {email, password, name, surname, company} = registerData;
    return Requester.post('/user/account', 201, {email, password, name, surname, company}, {
        request: signUpRequest,
        success: signUpSuccess,
        error: signUpFailure
    })(dispatch);
};

export const signOut = () => {
    return ActionCreator.createAction(SIGN_OUT_SUCCESS);
};
