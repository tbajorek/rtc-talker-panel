import {CHANGE_STATUS, CHANGE_STATUS_SUCCESS} from "../actions/availability";

const online = (state = {loading: false, value: false}, action) => {
    switch (action.type) {
        case CHANGE_STATUS:
            return {...state, loading: true};
        case CHANGE_STATUS_SUCCESS:
            return {loading: false, value: action.payload.online};
    }
    return state;
};

export const isChangingOnline = (state) => state.online.loading;
export const isOnline = (state) => state.online.value;

export default online;