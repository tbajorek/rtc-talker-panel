import Requester from "tbrtc-common/utilities/Requester";
import ActionCreator from "tbrtc-common/utilities/ActionCreator";
import Messages from '../utils/Messages';

export const CHANGE_AVAILABILITY_REQUEST = 'CHANGE_AVAILABILITY_REQUEST';
export const CHANGE_AVAILABILITY_SUCCESS = 'CHANGE_AVAILABILITY_SUCCESS';
export const CHANGE_AVAILABILITY_FAILURE = 'CHANGE_AVAILABILITY_FAILURE';

export const CHANGE_STATUS = 'CHANGE_STATUS';
export const CHANGE_STATUS_SUCCESS = 'CHANGE_STATUS_SUCCESS';

export const changeAvailabilityRequest = (payload) => {
    return ActionCreator.createAction(CHANGE_AVAILABILITY_REQUEST, { ...payload });
};

export const changeAvailabilitySuccess = (data) => {
    return (dispatch) => {
        Messages.success('Dostępność użytkownika '+data.name+' '+data.surname+' została zmieniona');
        dispatch(ActionCreator.createAction(CHANGE_AVAILABILITY_SUCCESS, { ...data }));
    }
};

export const changeAvailabilityFailure = (data) => {
    return ActionCreator.createErrorAction(CHANGE_AVAILABILITY_FAILURE, { message: data.message, title: "Problem ze zmianą dostepności" });
};

export const changeAvailability = (userId, data, token) => (dispatch, getState) => {
    const availability = [];
    if(data.video) {
        availability.push('video');
    }
    if(data.audio) {
        availability.push('audio');
    }
    if(data.chat) {
        availability.push('chat');
    }
    return Requester.put('/user/'+userId+'/availability', 200, {payload: availability}, {
        request: changeAvailabilityRequest,
        success: changeAvailabilitySuccess,
        error: changeAvailabilityFailure
    }, token)(dispatch);
};

export const setOnlineStatus = (online) => {
    return ActionCreator.createAction(CHANGE_STATUS, { online });
};

export const setOnlineStatusSuccess = (online) => {
    return ActionCreator.createAction(CHANGE_STATUS_SUCCESS, { online });
};