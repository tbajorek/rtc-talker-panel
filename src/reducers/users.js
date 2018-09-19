import {
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS, GET_MY_USERS_REQUEST,
    GET_MY_USERS_SUCCESS, GET_USERS_FOR_COMP_SUCCESS,
    SET_ACTIVATED_REQUEST,
    UPDATE_ALL_USER,
    UPDATE_MY_USER
} from "../actions/users";

const initialState = {
    loading: false,
    my: [],
    all: [],
    byCompanies: {}
};

const users = (state = initialState, action) => {
    switch (action.type) {
        case GET_MY_USERS_REQUEST:
            return {...state, loading: true};
        case GET_MY_USERS_SUCCESS:
            return {...state, my: action.payload, loading: false};
        case GET_ALL_USERS_REQUEST:
            return {...state, loading: true};
        case GET_ALL_USERS_SUCCESS:
            return {...state, all: action.payload, loading: false};
        case SET_ACTIVATED_REQUEST:
            return {...state, loading: true};
        case UPDATE_MY_USER:
            return {...state, my: state.my.map(user => user.id === action.payload.id ? action.payload : user), loading: false};
        case UPDATE_ALL_USER:
            return {...state, all: state.all.map(user => user.id === action.payload.id ? action.payload : user), loading: false};
        case GET_USERS_FOR_COMP_SUCCESS:
            return {...state, byCompanies: {...state.byCompanies, [action.payload.companyId]: action.payload.users}};
        default:
            return state;
    }
};

export default users;

export const getMyUsersList = state => state.users.my;
export const getMyUserById = (state, id) => state.users.my.find(foundUser => foundUser.id === id);
export const isUsersLoading = state => state.users.loading;
export const getAllUsersList = state => state.users.all;
export const getAllUserById = (state, id) => state.users.all.find(foundUser => foundUser.id === id);
export const getUsersByCompany = (state, companyId) => state.users.byCompanies[companyId];