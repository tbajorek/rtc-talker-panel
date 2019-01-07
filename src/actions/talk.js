import ActionCreator from "tbrtc-common/utilities/ActionCreator";
import Messages from "../utils/Messages";

export const ANY_ERROR_WITH_TALK = 'ANY_ERROR_WITH_TALK';

export const REQUEST_FOR_SESSION = 'REQUEST_FOR_SESSION';
export const TALK_SESSION_START = 'TALK_SESSION_START';
export const TALK_SESSION_STOP = 'TALK_SESSION_STOP';
export const SET_TALK_TYPE = 'SET_TALK_TYPE';
export const REQUEST_FOR_TALK = 'REQUEST_FOR_TALK';
export const ACCEPT_TALK = 'ACCEPT_TALK';
export const STARTED_TALK = 'STARTED_TALK';
export const REJECT_TALK = 'REJECT_TALK';
export const SEND_CHAT_MESSAGE = 'SEND_CHAT_MESSAGE';
export const RECEIVE_CHAT_MESSAGE = 'RECEIVE_CHAT_MESSAGE';
export const END_TALK = 'END_TALK';
export const SET_VIDEO = 'SET_VIDEO';
export const SET_FILE_INPUT = 'SET_FILE_INPUT';

export const SET_MUTED_AUDIO = 'SET_MUTED_AUDIO';
export const SET_MUTED_VIDEO = 'SET_MUTED_VIDEO';
export const SET_VOLUME_LEVEL = 'SET_VOLUME_LEVEL';

export const START_SELECTING_FILES = 'START_SELECTING_FILES';
export const FILE_TRANSFER_START = 'FILE_TRANSFER_START';
export const FILE_TRANSFER_UPDATE = 'FILE_TRANSFER_UPDATE';
export const FILE_TRANSFER_FINISH = 'FILE_TRANSFER_FINISH';
export const SET_ACTIVE_TALK = 'SET_ACTIVE_TALK';
export const SET_DOMAIN_INFO = 'SET_DOMAIN_INFO';
export const BREAK_TALK = 'BREAK_TALK';

export const anyTalkErrorOccured = (message) => ActionCreator.createErrorAction(ANY_ERROR_WITH_TALK, { message, title: "Problem z komunikacją" });

export const requestForSession = (userId) => ActionCreator.createAction(REQUEST_FOR_SESSION, { userId });
export const talkSessionStart = (sessionId) => ActionCreator.createAction(TALK_SESSION_START, { sessionId });
export const talkStop = (message = false) => (dispatch) => {
    if(message) {
        Messages.success("Info", `Rozmowa została zakończona`);
    }
    dispatch(ActionCreator.createAction(TALK_SESSION_STOP));
};
export const startedTalk = () => ActionCreator.createAction(STARTED_TALK);
export const endTalk = () => (dispatch) => {
    dispatch(ActionCreator.createAction(END_TALK));
};

export const setTalkType = (type) => ActionCreator.createAction(SET_TALK_TYPE, { type });
export const requestForTalk = (request) => ActionCreator.createAction(REQUEST_FOR_TALK, { request });
export const acceptRequestedTalk = () => ActionCreator.createAction(ACCEPT_TALK);
export const rejectRequestedTalk = () => (dispatch) => {
    dispatch(ActionCreator.createAction(REJECT_TALK));
    dispatch(talkStop(false));
};

export const sendChatMessage = (message) => ActionCreator.createAction(SEND_CHAT_MESSAGE, { message });
export const receiveChatMessage = (message) => ActionCreator.createAction(RECEIVE_CHAT_MESSAGE, { message: message._clone() });

export const setVideo = (type, element) => ActionCreator.createAction(SET_VIDEO, {type, element});
export const setFileInput = (fileInput) => ActionCreator.createAction(SET_FILE_INPUT, {fileInput});

export const setMutedAudio = (value) => ActionCreator.createAction(SET_MUTED_AUDIO, { value });
export const setMutedVideo = (value) => ActionCreator.createAction(SET_MUTED_VIDEO, { value });
export const setVolumeLevel = (level) => ActionCreator.createAction(SET_VOLUME_LEVEL, { level });

export const startSelectingFiles = (fileId) => ActionCreator.createAction(START_SELECTING_FILES, { fileId });
export const startTransferFile = (id, type, info) => ActionCreator.createAction(FILE_TRANSFER_START, { id, type, info });
export const updateTransferFile = (id, stats) => ActionCreator.createAction(FILE_TRANSFER_UPDATE, { id, stats });
export const finishTransferFile = (id) => ActionCreator.createAction(FILE_TRANSFER_FINISH, { id });
export const setActiveTalk = (activeTalk) => ActionCreator.createAction(SET_ACTIVE_TALK, { activeTalk });
export const setDomainInfo = (domain, siteUrl) => ActionCreator.createAction(SET_DOMAIN_INFO, { domain, siteUrl });
export const breakTalk = () => ActionCreator.createAction(BREAK_TALK);