import UserModel from '../models/User';
import {LOAD_AUTH_DATA} from "../actions/auth";
import {SIGN_OUT_SUCCESS} from "../actions/auth";
import {SAVE_MY_ADDRESS_SUCCESS} from "../actions/profile";
import {CHANGE_AVAILABILITY_SUCCESS} from "../actions/availability";

const initialState = UserModel.createGuest();

const loggedUser = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_AUTH_DATA:
        case SAVE_MY_ADDRESS_SUCCESS:
        case CHANGE_AVAILABILITY_SUCCESS:
            const model = new UserModel(
                action.payload.id,
                action.payload.name,
                action.payload.surname,
                action.payload.email,
                action.payload.avatar,
                action.payload.token ? action.payload.token : state.token,
                action.payload.role,
                action.payload.address,
                action.payload.company,
                action.payload.departments,
                action.payload.availability,
                action.payload.validUntil ? action.payload.validUntil : state.validUntil
            );
            return model;
        case SIGN_OUT_SUCCESS:
            return UserModel.createGuest();
        default:
            return state;
    }
};

export default loggedUser;

export const getLoggedUser = (state) => state.loggedUser;
export const getToken = (state) => state.loggedUser.token;
export const isLogged = (state) => state.loggedUser.token !== null;