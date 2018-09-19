import {
    ACCEPT_TALK,
    END_TALK, FILE_TRANSFER_FINISH, FILE_TRANSFER_START, FILE_TRANSFER_UPDATE,
    RECEIVE_CHAT_MESSAGE,
    REJECT_TALK,
    REQUEST_FOR_SESSION,
    REQUEST_FOR_TALK,
    SEND_CHAT_MESSAGE, SET_ACTIVE_TALK, SET_FILE_INPUT,
    SET_MUTED_AUDIO,
    SET_MUTED_VIDEO,
    SET_VIDEO,
    SET_VOLUME_LEVEL,
    STARTED_TALK,
    TALK_SESSION_START,
    TALK_SESSION_STOP
} from "../actions/talk";
import ChatMessage from "../models/ChatMessage";

const initialState = {
    sessionRequest: null,
    talkRequest: false,
    sessionId: null,
    requestObject: null,
    remoteUser: null,
    loadingCall: false,
    type: null,
    messages: [],
    files: {},
    fileInput: null,
    lastAddedFile: null,
    domain: '',
    siteUrl: '',
    video: {
        local: null,
        remote: null
    },
    mutedAudio: false,
    mutedVideo: false,
    volumeLevel: 50,
    activeTalk: false,
    finishing: false
};

const talk = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_FOR_SESSION:
            return {...state, sessionRequest: action.payload.userId};
        case TALK_SESSION_START:
            return {...state, sessionId: action.payload.sessionId};
        case TALK_SESSION_STOP:
            return {...initialState, finishing: true};
        case REQUEST_FOR_TALK:
            return {...state, requestObject: action.payload.request, remoteUser: action.payload.request.requestMessage.user, type: action.payload.type, talkRequest: true};
        case ACCEPT_TALK:
            return {...state, loadingCall: true, requestObject: null, talkRequest: false};
        case REJECT_TALK:
            return {...state, remoteUser: null, requestObject: null, type: null, talkRequest: false};
        case STARTED_TALK:
            return {...state, loadingCall: false};
        case RECEIVE_CHAT_MESSAGE:
            const clonedMessages = state.messages.map(message => message instanceof ChatMessage ? message._clone() : message);
            clonedMessages.push(action.payload.message);
            return {...state, messages: clonedMessages};
        case END_TALK:
            return initialState;
        case SET_VIDEO:
            const oldVideo = state.video;
            const newVideo = {local: oldVideo.local, remote: oldVideo.remote};
            newVideo[action.payload.type] = action.payload.element;
            return {...state, video: newVideo};
        case SET_MUTED_AUDIO:
            return {...state, mutedAudio: action.payload.value};
        case SET_MUTED_VIDEO:
            return {...state, mutedVideo: action.payload.value};
        case SET_VOLUME_LEVEL:
            return {...state, volumeLevel: action.payload.level};
        case FILE_TRANSFER_START: {
            const newFiles = {...state.files};
            const {id, type, info} = action.payload;
            newFiles[id] = {type, info, stats: null};
            return {...state, files: newFiles};
        }
        case FILE_TRANSFER_UPDATE: {
            const newFiles = {...state.files};
            const {id, stats} = action.payload;
            newFiles[id] = {...newFiles[id], stats};
            return {...state, files: newFiles};
        }
        case FILE_TRANSFER_FINISH:
            const newFiles = {...state.files};
            delete newFiles[action.payload.id];
            return {...state, files: newFiles};
        case SET_FILE_INPUT:
            return {...state, fileInput: action.payload.fileInput};
        case SET_ACTIVE_TALK:
            return {...state, activeTalk: action.payload.activeTalk};
    }
    return state;
};

export const getSessionId = (state) => state.talk.sessionId;
export const getRequestedUserId = (state) => state.talk.sessionRequest;
export const isOnline = (state) => state.online.value;
export const isActiveRequest = (state) => state.talk.sessionRequest !== null;
export const getRemoteUser = state => state.talk.remoteUser;
export const getTalkType = state => state.talk.type;
export const isLoadingCall = state => state.talk.loadingCall;
export const isTalkRequest = state => state.talk.talkRequest;
export const getRequestObject = state => state.talk.requestObject;
export const getMessageList = state => state.talk.messages;
export const getFileList = state => state.talk.files;
export const getUserDomain = state => state.talk.domain;
export const getUserSiteUrl = state => state.talk.siteUrl;
export const getLocalVideo = state => state.talk.video.local;
export const getRemoteVideo = state => state.talk.video.remote;
export const getAllVideo = state => state.talk.video;
export const isMutedAudio = state => state.talk.mutedAudio;
export const isMutedVideo = state => state.talk.mutedVideo;
export const getVolumeLevel = state => state.talk.volumeLevel;
export const getFileInput = state => state.talk.fileInput;
export const isActiveTalk = state => state.talk.activeTalk;
export const isFinishing = state => state.talk.finishing;

export const getFileData = state => fileId => fileId in state.talk.files ? state.talk.files[fileId] : null;

export default talk;