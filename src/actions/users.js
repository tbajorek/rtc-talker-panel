import Requester from "tbrtc-common/utilities/Requester";
import ActionCreator from "tbrtc-common/utilities/ActionCreator";
import Messages from "../utils/Messages";

export const UPDATE_MY_USER = 'UPDATE_MY_USER';
export const UPDATE_ALL_USER = 'UPDATE_ALL_USER';

export const GET_MY_USERS_REQUEST = 'GET_MY_USERS_REQUEST';
export const GET_MY_USERS_SUCCESS = 'GET_MY_USERS_SUCCESS';
export const GET_MY_USERS_FAILURE = 'GET_MY_USERS_FAILURE';
export const GET_ALL_USERS_REQUEST = 'GET_ALL_USERS_REQUEST';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAILURE = 'GET_ALL_USERS_FAILURE';
export const GET_USERS_FOR_COMP_REQUEST = 'GET_USERS_FOR_COMP_REQUEST';
export const GET_USERS_FOR_COMP_SUCCESS = 'GET_USERS_FOR_COMP_SUCCESS';
export const GET_USERS_FOR_COMP_FAILURE = 'GET_USERS_FOR_COMP_FAILURE';

export const SET_ACTIVATED_REQUEST = 'SET_ACTIVATED_REQUEST';
export const SET_ACTIVATED_SUCCESS = 'SET_ACTIVATED_SUCCESS';
export const SET_ACTIVATED_FAILURE = 'SET_ACTIVATED_FAILURE';

export const CHANGE_USER_DEPARTMENT_REQUEST = 'CHANGE_USER_DEPARTMENT_REQUEST';
export const CHANGE_USER_DEPARTMENT_SUCCESS = 'CHANGE_USER_DEPARTMENT_SUCCESS';
export const CHANGE_USER_DEPARTMENT_FAILURE = 'CHANGE_USER_DEPARTMENT_FAILURE';

const clearUserdata = (data) => {
    const userData = data;
    Object.keys(userData).forEach(key => {
        if(key.indexOf('_') === 0) {
            delete userData[key];
        }
        delete userData.error;
        userData.fullName = `${userData.name} ${userData.surname}`;
        userData.key = userData.id;
    });
    return userData;
};

export const updateMyUser = (user) => {
    return ActionCreator.createAction(UPDATE_MY_USER, { ...clearUserdata(user) });
};

export const updateAllUser = (user) => {
    return ActionCreator.createAction(UPDATE_ALL_USER, { ...clearUserdata(user) });
};

export const getUsersForCompRequest = (payload) => {
    return ActionCreator.createAction(GET_USERS_FOR_COMP_REQUEST, { ...payload });
};

export const getUsersForCompSuccess = (data) => {
    return (dispatch) => {
        const users = data.users.map(user => ({...user, fullName: `${user.name} ${user.surname}`, key: user.id}));
        dispatch(ActionCreator.createAction(GET_USERS_FOR_COMP_SUCCESS, {users, companyId: data._requestPayload.companyId}));
    }
};

export const getUsersForCompFailure = (data) => {
    return ActionCreator.createErrorAction(GET_USERS_FOR_COMP_FAILURE, { message: data.message, title: "Nie udało się pobrać listy użytkowników Twojej firmy" });
};

export const getUsersForCompany = (companyId, token) => (dispatch, getState) => {
    return Requester.get('/users/'+companyId, 200, {companyId}, {
        request: getUsersForCompRequest,
        success: getUsersForCompSuccess,
        error: getUsersForCompFailure
    }, token)(dispatch);
};

export const getMyUsersRequest = (payload) => {
    return ActionCreator.createAction(GET_MY_USERS_REQUEST, { ...payload });
};

export const getMyUsersSuccess = (data) => {
    return (dispatch) => {
        const users = data.users.map(user => ({...user, fullName: `${user.name} ${user.surname}`, key: user.id}));
        dispatch(ActionCreator.createAction(GET_MY_USERS_SUCCESS, users));
    }
};

export const getMyUsersFailure = (data) => {
    return ActionCreator.createErrorAction(GET_MY_USERS_FAILURE, { message: data.message, title: "Nie udało się pobrać listy użytkowników Twojej firmy" });
};

export const getUsersForMyCompany = (companyId, token) => (dispatch, getState) => {
    return Requester.get('/users/'+companyId, 200, {companyId}, {
        request: getMyUsersRequest,
        success: getMyUsersSuccess,
        error: getMyUsersFailure
    }, token)(dispatch);
};

export const getAllUsersRequest = (payload) => {
    return ActionCreator.createAction(GET_ALL_USERS_REQUEST, { ...payload });
};

export const getAllUsersSuccess = (data) => {
    return (dispatch) => {
        const users = data.users.map(user => ({...user, fullName: `${user.name} ${user.surname}`, key: user.id}));
        dispatch(ActionCreator.createAction(GET_ALL_USERS_SUCCESS, users));
    }
};

export const getAllUsersFailure = (data) => {
    return ActionCreator.createErrorAction(GET_ALL_USERS_FAILURE, { message: data.message, title: "Nie udało się pobrać listy użytkowników systemu" });
};

export const getAllUsers = (token) => (dispatch, getState) => {
    return Requester.get('/users', 200, null, {
        request: getAllUsersRequest,
        success: getAllUsersSuccess,
        error: getAllUsersFailure
    }, token)(dispatch);
};

export const setMyActivatedRequest = (payload) => {
    return ActionCreator.createAction(SET_ACTIVATED_REQUEST, { ...payload });
};

export const setMyActivatedSuccess = (data) => {
    return (dispatch) => {
        const user = clearUserdata(data);
        dispatch(ActionCreator.createAction(SET_ACTIVATED_SUCCESS, user));
        dispatch(updateMyUser(user));
        Messages.success('Status użytkownika '+user.fullName+' został zmieniony');
    }
};

export const setMyActivatedFailure = (data) => {
    return ActionCreator.createErrorAction(SET_ACTIVATED_FAILURE, { message: data.message, title: "Nie udało się aktywować użytkownika" });
};

export const setMyActivated = (userId, activated, token) => (dispatch, getState) => {
    return Requester.put('/user/'+userId+'/activated', 200, {payload: activated ? 1 : 0}, {
        request: setMyActivatedRequest,
        success: setMyActivatedSuccess,
        error: setMyActivatedFailure
    }, token)(dispatch);
};

export const setAllActivatedRequest = (payload) => {
    return ActionCreator.createAction(SET_ACTIVATED_REQUEST, { ...payload });
};

export const setAllActivatedSuccess = (data) => {
    return (dispatch) => {
        const user = clearUserdata(data);
        dispatch(ActionCreator.createAction(SET_ACTIVATED_SUCCESS, user));
        dispatch(updateAllUser(user));
        Messages.success('Dostępność użytkownika '+user.fullName+' została zmieniona');
    }
};

export const setAllActivatedFailure = (data) => {
    return ActionCreator.createErrorAction(SET_ACTIVATED_FAILURE, { message: data.message, title: "Nie udało się aktywować użytkownika" });
};

export const setAllActivated = (userId, activated, token) => (dispatch, getState) => {
    return Requester.put('/user/'+userId+'/activated', 200, {payload: activated ? 1 : 0}, {
        request: setAllActivatedRequest,
        success: setAllActivatedSuccess,
        error: setAllActivatedFailure
    }, token)(dispatch);
};

export const changeMyUserDepartmentRequest = (payload) => {
    return ActionCreator.createAction(CHANGE_USER_DEPARTMENT_REQUEST, { ...payload });
};

export const changeMyUserDepartmentSuccess = (data) => {
    return (dispatch) => {
        const user = clearUserdata(data);
        dispatch(ActionCreator.createAction(CHANGE_USER_DEPARTMENT_SUCCESS, user));
        dispatch(updateMyUser(user));
        Messages.success('Zostały zmienione ustawienia departamentów użytkownika '+user.fullName);
    }
};

export const changeMyUserDepartmentFailure = (data) => {
    return ActionCreator.createErrorAction(CHANGE_USER_DEPARTMENT_FAILURE, { message: data.message, title: "Nie udało się przypisać departamentu" });
};

export const changeMyUserDepartment = (userId, departments, token) => (dispatch, getState) => {
    return Requester.put('/user/'+userId+'/departments', 200, {payload: departments}, {
        request: changeMyUserDepartmentRequest,
        success: changeMyUserDepartmentSuccess,
        error: changeMyUserDepartmentFailure
    }, token)(dispatch);
};

export const changeAllUserDepartmentRequest = (payload) => {
    return ActionCreator.createAction(CHANGE_USER_DEPARTMENT_REQUEST, { ...payload });
};

export const changeAllUserDepartmentSuccess = (data) => {
    return (dispatch) => {
        const user = clearUserdata(data);
        dispatch(ActionCreator.createAction(CHANGE_USER_DEPARTMENT_SUCCESS, user));
        dispatch(updateAllUser(user));
        Messages.success('Zostały zmienione ustawienia departamentów użytkownika '+user.fullName);
    }
};

export const changeAllUserDepartmentFailure = (data) => {
    return ActionCreator.createErrorAction(CHANGE_USER_DEPARTMENT_FAILURE, { message: data.message, title: "Nie udało się przypisać departamentu" });
};

export const changeAllUserDepartment = (userId, departments, token) => (dispatch, getState) => {
    return Requester.put('/user/'+userId+'/departments', 200, {payload: departments}, {
        request: changeAllUserDepartmentRequest,
        success: changeAllUserDepartmentSuccess,
        error: changeAllUserDepartmentFailure
    }, token)(dispatch);
};