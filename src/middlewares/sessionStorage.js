import {LOAD_AUTH_DATA, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS} from "../actions/auth";
import ActionCreator from "tbrtc-common/utilities/ActionCreator";
import {getLoggedUser, getToken, isLogged} from "../reducers/loggedUser";
import {ADD_MY_ADDRESS_SUCCESS, SAVE_MY_ADDRESS_SUCCESS} from "../actions/profile";
import UserModel from "../models/User";
import {CHANGE_AVAILABILITY_SUCCESS} from "../actions/availability";
import {ADD_MY_COMPANY_SUCCESS, clearCompanyData} from "../actions/company";

const STORED_AUTH_KEY = 'RTCTALKER_SAVED_DATA';

export default store => next => (action) => {
    const loggedUser = getLoggedUser(store.getState());
    switch(action.type) {
        case '@@router/LOCATION_CHANGE'://loading if saved
            const fromStorage = localStorage.getItem(STORED_AUTH_KEY);
            const isLoggedUser = isLogged(store.getState());
            if (fromStorage && !isLoggedUser) {
                try {
                    const storedData = UserModel.fromJSON(JSON.parse(fromStorage));
                    if(storedData.isValid()) {
                        store.dispatch(ActionCreator.createAction(LOAD_AUTH_DATA, storedData));
                    } else {
                        store.dispatch(ActionCreator.createAction(SIGN_OUT_SUCCESS, null));
                    }
                }
                catch (error) {console.error(error);}
            }
            break;
        case SIGN_IN_SUCCESS:
            if (action.payload.remember === true) {
                const { user, token, validUntil } = action.payload;
                localStorage.setItem(STORED_AUTH_KEY, JSON.stringify({...user, token, validUntil}));
            }
            break;
        case SAVE_MY_ADDRESS_SUCCESS:
            if(!!loggedUser.address || loggedUser.address.id === action.payload.address.id) {
                let validUntil = JSON.parse(localStorage.getItem(STORED_AUTH_KEY)).validUntil;
                const token = getToken(store.getState());
                const user = action.payload;
                const data = {...user, token, validUntil};
                localStorage.setItem(STORED_AUTH_KEY, JSON.stringify(data));
                store.dispatch(ActionCreator.createAction(LOAD_AUTH_DATA, data));
            }
            break;
        case ADD_MY_ADDRESS_SUCCESS:
            if(!loggedUser.address) {
                let validUntil = JSON.parse(localStorage.getItem(STORED_AUTH_KEY)).validUntil;
                const token = getToken(store.getState());
                const user = action.payload;
                const data = {...user, token, validUntil};
                localStorage.setItem(STORED_AUTH_KEY, JSON.stringify(data));
                store.dispatch(ActionCreator.createAction(LOAD_AUTH_DATA, data));
            }
            break;
        case ADD_MY_COMPANY_SUCCESS:
            if(!loggedUser.company) {
                let user = JSON.parse(localStorage.getItem(STORED_AUTH_KEY));
                const token = getToken(store.getState());
                user.company = clearCompanyData(action.payload);
                const data = {...user, token};
                localStorage.setItem(STORED_AUTH_KEY, JSON.stringify(data));
                store.dispatch(ActionCreator.createAction(LOAD_AUTH_DATA, data));
            }
            break;
        case CHANGE_AVAILABILITY_SUCCESS:
            let validUntil = JSON.parse(localStorage.getItem(STORED_AUTH_KEY)).validUntil;
            const token = getToken(store.getState());
            const user = action.payload;
            const data = {...user, token, validUntil};
            localStorage.setItem(STORED_AUTH_KEY, JSON.stringify(data));
            store.dispatch(ActionCreator.createAction(LOAD_AUTH_DATA, data));
            break;
        case SIGN_OUT_SUCCESS:
            localStorage.removeItem(STORED_AUTH_KEY);
            break;
    }
    return next(action);
};