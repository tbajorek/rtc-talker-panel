import {
    ADD_DEPARTMENT_SUCCESS,
    GET_DEPARTMENTS_FAILURE,
    GET_DEPARTMENTS_REQUEST,
    GET_DEPARTMENTS_SUCCESS, REMOVE_DEPARTMENT_SUCCESS,
    SET_NEW_DEP_MODAL_VISIBILITY
} from "../actions/departments";

const initialState = {
    data: {},
    modal: {
        loading: false,
        visible: false
    }
};


const departments = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEW_DEP_MODAL_VISIBILITY:
            const {visible, loading} = action.payload;
            return {...state, modal: {loading, visible}};
        case GET_DEPARTMENTS_REQUEST:
            return {...state, data: {...state.data, [action.payload.companyId]: {loading: true}}};
        case GET_DEPARTMENTS_SUCCESS:
            return {...state, data: {...state.data, [action.payload.companyId]: {list: action.payload.departments.map(department => ({...department, companyId: action.payload.companyId})), loading: false}}};
        case GET_DEPARTMENTS_FAILURE:
            return {...state, data: {...state.data, [action.payload.companyId]: {loading: false}}};
        case ADD_DEPARTMENT_SUCCESS:
            const newList = !!state.data[action.payload.companyId].list ? [...state.data[action.payload.companyId].list] : [];
            const {id, name, workers, key, companyId} = action.payload;
            newList.push({id, name, workers, key, companyId});
            return {...state, data: {...state.data, [action.payload.companyId]: {list: newList, loading: false}}};
        case REMOVE_DEPARTMENT_SUCCESS:
            const newData = state.data[action.payload.companyId].list.filter(department => department.id !== action.payload.departmentId);
            return {...state, data: {...state.data, [action.payload.companyId]: {list: newData, loading: state.data[action.payload.companyId].loading}}};
        default:
            return state;
    }
};

export default departments;

export const getDepartments = (state, companyId) => (typeof state.departments.data[companyId] !== 'undefined' && typeof state.departments.data[companyId].list !== 'undefined') ? state.departments.data[companyId].list : null;
export const isLoadingDepartments = (state, companyId) => (typeof state.departments.data[companyId] !== 'undefined' && typeof state.departments.data[companyId].loading !== 'undefined') ? state.departments.data[companyId].loading : false;
export const isModalLoading = state => state.departments.modal.loading;
export const isModalVisible = state => state.departments.modal.visible;