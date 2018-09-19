import Requester from "tbrtc-common/utilities/Requester";
import ActionCreator from "tbrtc-common/utilities/ActionCreator";
import {
    saveAddressFailure,
    saveAddressRequest,
    saveAddressSuccess,
    saveMyAddressSuccess,
    saveMyCompanyAddressSuccess
} from "./profile";
import Messages from "../utils/Messages";
import {SET_ACTIVATED_FAILURE, SET_ACTIVATED_REQUEST, SET_ACTIVATED_SUCCESS, updateMyUser} from "./users";
import {setInitializationStep} from "./initialization";

export const LOAD_COMPANY_REQUEST = 'LOAD_COMPANY_REQUEST';
export const LOAD_COMPANY_SUCCESS = 'LOAD_COMPANY_SUCCESS';
export const LOAD_COMPANY_FAILURE = 'LOAD_COMPANY_FAILURE';
export const LOAD_ALL_COMPANIES_REQUEST = 'LOAD_ALL_COMPANIES_REQUEST';
export const LOAD_ALL_COMPANIES_SUCCESS = 'LOAD_ALL_COMPANIES_SUCCESS';
export const LOAD_ALL_COMPANIES_FAILURE = 'LOAD_ALL_COMPANIES_FAILURE';
export const SET_ACTIVATED_COMPANY_REQUEST = 'SET_ACTIVATED_COMPANY_REQUEST';
export const SET_ACTIVATED_COMPANY_SUCCESS = 'SET_ACTIVATED_COMPANY_SUCCESS';
export const SET_ACTIVATED_COMPANY_FAILURE = 'SET_ACTIVATED_COMPANY_FAILURE';
export const ADD_MY_COMPANY_REQUEST = 'ADD_MY_COMPANY_REQUEST';
export const ADD_MY_COMPANY_SUCCESS = 'ADD_MY_COMPANY_SUCCESS';
export const ADD_MY_COMPANY_FAILURE = 'ADD_MY_COMPANY_FAILURE';

export const clearCompanyData = (data) => {
    const companyData = data;
    Object.keys(companyData).forEach(key => {
        if(key.indexOf('_') === 0) {
            delete companyData[key];
        }
        delete companyData.error;
        companyData.key = companyData.id;
    });
    return companyData;
};

export const loadCompanyRequest = (payload) => {
    return ActionCreator.createAction(LOAD_COMPANY_REQUEST, { ...payload });
};

export const loadCompanyFailure = (data) => {
    return ActionCreator.createErrorAction(LOAD_COMPANY_FAILURE, { message: data.message, title: "Błąd ładowania danych firmy" });
};

export const loadCompanySuccess = (data) => {
    return (dispatch) => {
        dispatch(ActionCreator.createAction(LOAD_COMPANY_SUCCESS, data));
    }
};

export const loadCompany = (token, companyId) => (dispatch, getState) => {
    return Requester.get('/company/'+companyId, 200, {companyId}, {
        request: loadCompanyRequest,
        success: loadCompanySuccess,
        error: loadCompanyFailure
    }, token)(dispatch);
};

export const loadAllCompaniesRequest = (payload) => {
    return ActionCreator.createAction(LOAD_ALL_COMPANIES_REQUEST, { ...payload });
};

export const loadAllCompaniesFailure = (data) => {
    return ActionCreator.createErrorAction(LOAD_ALL_COMPANIES_FAILURE, { message: data.message, title: "Błąd ładowania listy firm" });
};

export const loadAllCompaniesSuccess = (data) => {
    return (dispatch) => {
        const companies = data.companies.map(company => ({...company, key: company.id}));
        dispatch(ActionCreator.createAction(LOAD_ALL_COMPANIES_SUCCESS, {companies}));
    }
};

export const loadAllCompanies = (token) => (dispatch, getState) => {
    return Requester.get('/companies', 200, null, {
        request: loadAllCompaniesRequest,
        success: loadAllCompaniesSuccess,
        error: loadAllCompaniesFailure
    }, token)(dispatch);
};

export const setActivatedCompanyRequest = (payload) => {
    return ActionCreator.createAction(SET_ACTIVATED_COMPANY_REQUEST, { ...payload });
};

export const setActivatedCompanySuccess = (data) => {
    return (dispatch) => {
        const company = clearCompanyData(data);
        dispatch(ActionCreator.createAction(SET_ACTIVATED_COMPANY_SUCCESS, {company}));
        Messages.success('Status firmy '+company.name+' został zmieniony');
    }
};

export const setActivatedCompanyFailure = (data) => {
    return ActionCreator.createErrorAction(SET_ACTIVATED_COMPANY_FAILURE, { message: data.message, title: "Nie udało się aktywować firmy" });
};

export const setActivatedCompany = (userId, activated, token) => (dispatch, getState) => {
    return Requester.put('/company/'+userId+'/activated', 200, {payload: activated ? 1 : 0}, {
        request: setActivatedCompanyRequest,
        success: setActivatedCompanySuccess,
        setActivatedCompanyFailure
    }, token)(dispatch);
};

export const addMyCompanyRequest = (payload) => {
    return ActionCreator.createAction(ADD_MY_COMPANY_REQUEST, { ...payload });
};

export const addMyCompanyFailure = (data) => {
    return ActionCreator.createErrorAction(ADD_MY_COMPANY_FAILURE, { message: data.message, title: "Błąd ładowania listy firm" });
};

export const addMyCompanySuccess = (data) => {
    return (dispatch) => {
        dispatch(ActionCreator.createAction(ADD_MY_COMPANY_SUCCESS, data));
        dispatch(setInitializationStep(3));
    }
};

export const addMyCompany = (token, name, nip, address) => (dispatch, getState) => {
    return Requester.post('/user/me/company', 201, {name, nip, address}, {
        request: addMyCompanyRequest,
        success: addMyCompanySuccess,
        error: addMyCompanyFailure
    }, token)(dispatch);
};