import ActionCreator from "tbrtc-common/utilities/ActionCreator";
import Messages from "../utils/Messages";
import Requester from "tbrtc-common/utilities/Requester";

export const SET_NEW_DEP_MODAL_VISIBILITY = 'SET_NEW_DEP_MODAL_VISIBILITY';

export const GET_DEPARTMENTS_REQUEST = 'GET_DEPARTMENTS_REQUEST';
export const GET_DEPARTMENTS_SUCCESS = 'GET_DEPARTMENTS_SUCCESS';
export const GET_DEPARTMENTS_FAILURE = 'GET_DEPARTMENTS_FAILURE';

export const ADD_DEPARTMENT_REQUEST = 'ADD_DEPARTMENT_REQUEST';
export const ADD_DEPARTMENT_SUCCESS = 'ADD_DEPARTMENT_SUCCESS';
export const ADD_DEPARTMENT_FAILURE = 'ADD_DEPARTMENT_FAILURE';

export const REMOVE_DEPARTMENT_REQUEST = 'REMOVE_DEPARTMENT_REQUEST';
export const REMOVE_DEPARTMENT_SUCCESS = 'REMOVE_DEPARTMENT_SUCCESS';
export const REMOVE_DEPARTMENT_FAILURE = 'REMOVE_DEPARTMENT_FAILURE';

export const setNewDepModalVisibility = (visible, loading) => ActionCreator.createAction(SET_NEW_DEP_MODAL_VISIBILITY, { visible, loading });

export const getDepartmentsRequest = (payload) => {
    return ActionCreator.createAction(GET_DEPARTMENTS_REQUEST, { ...payload });
};

export const getDepartmentsSuccess = (data) => {
    return (dispatch) => {
        const {companyId} = data;
        const departments = data.departments.map(department => ({...department, key: department.id}));
        dispatch(ActionCreator.createAction(GET_DEPARTMENTS_SUCCESS, {departments, companyId}));
    }
};

export const getDepartmentsFailure = (data) => {
    const {companyId} = data._requestPayload;
    return ActionCreator.createErrorAction(GET_DEPARTMENTS_FAILURE, { message: data.message, title: "Nie udało się pobrać listy departamentów", companyId });
};

export const getDepartmentsList = (companyId, token) => (dispatch, getState) => {
    return Requester.get('/company/'+companyId+'/departments', 200, {companyId}, {
        request: getDepartmentsRequest,
        success: getDepartmentsSuccess,
        error: getDepartmentsFailure
    }, token)(dispatch);
};

export const addDepartmentRequest = (payload) => {
    return ActionCreator.createAction(ADD_DEPARTMENT_REQUEST, { ...payload });
};

export const addDepartmentSuccess = (data) => {
    return (dispatch) => {
        const {id, name, workers, _requestPayload} = data;
        dispatch(ActionCreator.createAction(ADD_DEPARTMENT_SUCCESS, {id, name, workers, key: id, companyId: _requestPayload.companyId}));
        dispatch(setNewDepModalVisibility(false, false));
    }
};

export const addDepartmentFailure = (data) => {
    const {companyId} = data._requestPayload;
    return ActionCreator.createErrorAction(ADD_DEPARTMENT_FAILURE, { message: data.message, title: "Nie udało się dodać nowego departamentu", companyId });
};

export const addDepartment = (companyId, name, workers, token) => (dispatch, getState) => {
    return Requester.post('/company/'+companyId+'/departments', 201, {companyId, name, workers}, {
        request: addDepartmentRequest,
        success: addDepartmentSuccess,
        error: addDepartmentFailure
    }, token)(dispatch);
};

export const removeDepartmentRequest = (payload) => {
    return ActionCreator.createAction(REMOVE_DEPARTMENT_REQUEST, { ...payload });
};

export const removeDepartmentSuccess = (data) => {
    return (dispatch) => {
        const {_requestPayload} = data;
        dispatch(ActionCreator.createAction(REMOVE_DEPARTMENT_SUCCESS, {companyId: _requestPayload.companyId, departmentId: _requestPayload.departmentId}));
    }
};

export const removeDepartmentFailure = (data) => {
    const {companyId} = data._requestPayload;
    return ActionCreator.createErrorAction(REMOVE_DEPARTMENT_FAILURE, { message: data.message, title: "Nie udało się usunąć departamentu", companyId });
};

export const removeDepartment = (companyId, departmentId, token) => (dispatch, getState) => {
    return Requester.delete('/company/'+companyId+'/departments/'+departmentId, 204, {companyId, departmentId}, {
        request: removeDepartmentRequest,
        success: removeDepartmentSuccess,
        error: removeDepartmentFailure
    }, token)(dispatch);
};