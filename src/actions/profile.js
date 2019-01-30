import Requester from "tbrtc-common/utilities/Requester";
import ActionCreator from "tbrtc-common/utilities/ActionCreator";
import Messages from "../utils/Messages";

export const ADD_MY_ADDRESS_REQUEST = 'ADD_MY_ADDRESS_REQUEST';
export const ADD_MY_ADDRESS_SUCCESS = 'ADD_MY_ADDRESS_SUCCESS';
export const ADD_MY_ADDRESS_FAILURE = 'ADD_MY_ADDRESS_FAILURE';
export const SAVE_ADDRESS_REQUEST = 'SAVE_ADDRESS_REQUEST';
export const SAVE_USER_ADDRESS_SUCCESS = 'SAVE_USER_ADDRESS_SUCCESS';
export const SAVE_MY_ADDRESS_SUCCESS = 'SAVE_MY_ADDRESS_SUCCESS';
export const SAVE_COMPANY_ADDRESS_SUCCESS = 'SAVE_COMPANY_ADDRESS_SUCCESS';
export const SAVE_MY_COMPANY_ADDRESS_SUCCESS = 'SAVE_MY_COMPANY_ADDRESS_SUCCESS';
export const SAVE_ADDRESS_FAILURE = 'SAVE_ADDRESS_FAILURE';

export const addMyAddressRequest = (payload) => {
    return ActionCreator.createAction(ADD_MY_ADDRESS_REQUEST, { ...payload });
};

export const addMyUserAddressSuccess = (data) => {
    const { name, surname } = data;
    return (dispatch) => {
        Messages.success('Adres użytkownika '+name+' '+surname+' został dodany');
        dispatch(ActionCreator.createAction(ADD_MY_ADDRESS_SUCCESS, data));
    }
};

export const addMyAddressFailure = (data) => {
    return ActionCreator.createErrorAction(ADD_MY_ADDRESS_FAILURE, { message: data.message, title: "Błąd dodawania adresu użytkownika" });
};

export const addMyAddress = (token, street, building_number, post_code, city, country, phone) => (dispatch, getState) => {
    return Requester.post('/user/me/address', 201, {street, building_number, post_code, city, country, phone}, {
        request: addMyAddressRequest,
        success: addMyUserAddressSuccess,
        error: addMyAddressFailure
    }, token)(dispatch);
};

export const saveAddressRequest = (payload) => {
    return ActionCreator.createAction(SAVE_ADDRESS_REQUEST, { ...payload });
};

export const saveAddressFailure = (data) => {
    return ActionCreator.createErrorAction(SAVE_ADDRESS_FAILURE, { message: data.message, title: "Błąd zmiany adresu" });
};

export const saveUserAddressSuccess = (data) => {
    const { name, surname } = data;
    return (dispatch) => {
        Messages.success('Adres użytkownika '+name+' '+surname+' został zmieniony');
        dispatch(ActionCreator.createAction(SAVE_USER_ADDRESS_SUCCESS, data));
    }
};

export const saveMyAddressSuccess = (data) => {
    return (dispatch) => {
        saveUserAddressSuccess(data)(dispatch);
        dispatch(ActionCreator.createAction(SAVE_MY_ADDRESS_SUCCESS, data));
    }
};

export const saveMyAddress = (token, street, building_number, post_code, city, country, phone) => (dispatch, getState) => {
    return Requester.put('/user/me/address', 200, {street, building_number, post_code, city, country, phone}, {
        request: saveAddressRequest,
        success: saveMyAddressSuccess,
        error: saveAddressFailure
    }, token)(dispatch);
};

export const saveCompanyAddressSuccess = (data) => {
    const { name } = data;
    return (dispatch) => {
        Messages.success('Adres firmy '+name+' został zmieniony');
        dispatch(ActionCreator.createAction(SAVE_COMPANY_ADDRESS_SUCCESS, data));
    }
};

export const saveMyCompanyAddressSuccess = (data) => {
    return (dispatch) => {
        saveCompanyAddressSuccess(data)(dispatch);
        dispatch(ActionCreator.createAction(SAVE_MY_COMPANY_ADDRESS_SUCCESS, data));
    }
};

export const saveMyCompanyAddress = (token, street, building_number, post_code, city, country, phone) => (dispatch, getState) => {
    return Requester.put('/user/me/company', 200, {address: {street, building_number, post_code, city, country, phone}}, {
        request: saveAddressRequest,
        success: saveMyCompanyAddressSuccess,
        error: saveAddressFailure
    }, token)(dispatch);
};