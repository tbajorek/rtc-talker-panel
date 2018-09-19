import {
    LOAD_ALL_COMPANIES_FAILURE,
    LOAD_ALL_COMPANIES_REQUEST,
    LOAD_ALL_COMPANIES_SUCCESS,
    LOAD_COMPANY_SUCCESS, SET_ACTIVATED_COMPANY_FAILURE, SET_ACTIVATED_COMPANY_REQUEST, SET_ACTIVATED_COMPANY_SUCCESS
} from "../actions/company";
import {SAVE_COMPANY_ADDRESS_SUCCESS} from "../actions/profile";

const companies = (state = {list: {}, loading: false}, action) => {
    switch (action.type) {
        case LOAD_COMPANY_SUCCESS:
        case SAVE_COMPANY_ADDRESS_SUCCESS: {
            const newState = {...state};
            newState.list[action.payload.id] = action.payload;
            return newState;
        }
        case LOAD_ALL_COMPANIES_REQUEST:
        case SET_ACTIVATED_COMPANY_REQUEST:
            return {...state, loading: true};
        case LOAD_ALL_COMPANIES_SUCCESS: {
            const newList = {};
            action.payload.companies.forEach(company => newList[company.id] = company);
            return {...state, list: newList, loading: false};
        }
        case LOAD_ALL_COMPANIES_FAILURE:
        case SET_ACTIVATED_COMPANY_FAILURE:
            return {...state, loading: false};
        case SET_ACTIVATED_COMPANY_SUCCESS:
            return {...state, list: {...state.list, [action.payload.company.id]: {...state.list[action.payload.company.id], activated: action.payload.company.activated}}, loading: false};
    }
    return state;
};

export const isCompany = (id, state) => typeof state.companies.list[id] !== 'undefined';
export const getCompany = (id, state) => isCompany(id, state) ? state.companies.list[id] : {};
export const getAllCompanies = state => Object.values(state.companies.list);
export const isLoadingCompanies = state => state.companies.loading;

export default companies;