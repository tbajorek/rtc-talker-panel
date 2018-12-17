import {notification} from "antd";
import TbRtcClient from 'tbrtc-client/src/modules/main/TbRtcClient';
import {CHANGE_STATUS, CHANGE_STATUS_SUCCESS, setOnlineStatusSuccess} from "../actions/availability";
import {
    ACCEPT_TALK,
    acceptRequestedTalk,
    anyTalkErrorOccured, endTalk,
    finishTransferFile,
    receiveChatMessage,
    REJECT_TALK,
    rejectRequestedTalk,
    requestForSession,
    requestForTalk,
    SEND_CHAT_MESSAGE,
    SET_FILE_INPUT,
    SET_VIDEO, setActiveTalk,
    START_SELECTING_FILES,
    STARTED_TALK,
    startTransferFile, TALK_SESSION_STOP,
    talkSessionStart,
    talkStop,
    updateTransferFile
} from "../actions/talk";
import Messages from "../utils/Messages";
import makeBeep from "../utils/makeBeep";
import {updateFileNotification} from "../utils/fileNotification";
import createNotification from "../utils/createNotification";
import {getLoggedUser} from "../reducers/loggedUser";
import {
    getFileData, getFileInput,
    getLocalVideo, getRemoteVideo,
    getRequestedUserId,
    getRequestObject, getSessionId,
    getTalkType,
    isActiveRequest, isFinishing,
    isOnline
} from "../reducers/talk";
import ChatMessage from "../models/ChatMessage";

/**
 *
 * @param action
 * @param store
 * @param {TbRtcClient} tbRtc
 */
const initializeTbRTC = (action, store, tbRtc) => {
    tbRtc.isAnyError(error => {
        store.dispatch(anyTalkErrorOccured(error.toString()));
    });
    tbRtc.isConnected(() => store.dispatch(setOnlineStatusSuccess(action.payload.online)));
    tbRtc.isDisconnected(() => {
        if(!!getSessionId(store.getState())) {
            store.dispatch(talkStop());
        }
        store.dispatch(setOnlineStatusSuccess(!action.payload.online));
    });
    tbRtc.isNewSession((sessionId) => {
        store.dispatch(talkSessionStart(sessionId));
        tbRtc.sendDataToUser({task: 'session.join.ask', sessionId}, getRequestedUserId(store.getState()));
    });
    tbRtc.isUserCommunication(data => {
        switch (data.details.task) {
            case 'session.create.request':
                if (isOnline(store.getState()) && !isActiveRequest(store.getState())) {
                    store.dispatch(requestForSession(data.sender.id));
                    tbRtc.startSession();
                }
                break;
            case 'session.close.request':
                store.dispatch(talkStop());
                break;
        }

    });
    tbRtc.isRequest((request) => {
        makeBeep();
        createNotification(request.requestMessage.user);
        store.dispatch(requestForTalk(request, 'video'));
    });
    tbRtcClient.isRequestStopped(() => {
        Messages.info("Przerwanie", `Żądanie rozmowy zostało przerwane`);
        store.dispatch(endTalk());
    });
    tbRtc.isNewChatMessage(message => {
        store.dispatch(receiveChatMessage(new ChatMessage(message.user.id, message.content, message.date)));
    });

    tbRtc.isFileTransferStart(data => {
        updateFileNotification(data.channelId, data.type, data.file.info, null);
    });

    tbRtc.isFileTransferProgress(data => {
        updateFileNotification(data.channelId, data.type, data.file.info, data.stats);
    });

    tbRtc.isFileReceived(data => {
        data.file.download();
    });

    tbRtc.isFileSent(data => {
        store.dispatch(finishTransferFile(data.channelId));
    });

    tbRtc.isSessionUserLeft(data => {
        Messages.error("Błąd", `Rozmowa została przerwana przez zdalnego użytkownika`);
        tbRtc.closeSession();
        store.dispatch(endTalk());
    });

    tbRtc.isP2pStateChange((data) => {
        if(data.state === 'completed') {
            store.dispatch(setActiveTalk(true));
        } else if(data.state === 'closed') {
            store.dispatch(setActiveTalk(false));
        }
    });

    tbRtc.isSessionClosed(() => {
        if(isFinishing(store.getState())) {
            Messages.success("Sukces", `Rozmowa z użytkownikiem zakończyła się`);
        }
    });
};

const getConstraintsFromAvailability = (availability) => {
    const constraints = {};
    if (availability.indexOf('video') >= 0) {
        constraints.video = true;
    }
    if (availability.indexOf('audio') >= 0) {
        constraints.audio = true;
    }
    return constraints;
};

let tbRtcClient = null;
let requestObject = null;

export default store => next => (action) => {
    switch (action.type) {
        case CHANGE_STATUS:
            if (action.payload.online) {
                tbRtcClient = new TbRtcClient({
                    signaling: {
                        server: process.env.SIGNALING_SERVER_URL,
                        debug: {
                            recvMessages: true
                        }
                    },
                    peerConfig: {
                        iceServers: [
                            {
                                "urls": [
                                    "stun:stun.l.google.com:19302"
                                ]
                            }
                        ]
                    },
                    autoBindingMedia: false,
                    debug: true
                });
                initializeTbRTC(action, store, tbRtcClient);
                tbRtcClient.isInitialized(() => {
                    const state = store.getState();
                    tbRtcClient.setCurrentUser(getLoggedUser(state));
                    tbRtcClient.start(getConstraintsFromAvailability(getLoggedUser(state).availability));
                });
                window.tbRtc = tbRtcClient;
            } else {
                if (tbRtcClient) {
                    tbRtcClient.disconnect();
                    tbRtcClient = null;
                }
                return next(action);
            }
            break;
        case CHANGE_STATUS_SUCCESS:
            const prevOnline = isOnline(store.getState());
            if(prevOnline !== action.payload.online) {
                Messages.success('Zmiana dostępności', `Twoja dostępność została ${action.payload.online ? 'włączona' : 'wyłączona'}`);
            }
            break;
        case ACCEPT_TALK:
            if (tbRtcClient !== null) {
                requestObject = getRequestObject(store.getState());
                if (typeof requestObject === 'object' && 'confirm' in requestObject) {
                    requestObject.confirm();
                }
            }
            break;
        case REJECT_TALK:
            if (tbRtcClient !== null) {
                requestObject = getRequestObject(store.getState());
                if (typeof requestObject === 'object' && 'reject' in requestObject) {
                    requestObject.reject();
                }
                tbRtcClient.closeSession();
            }
            break;
        case SET_VIDEO:
            if(tbRtcClient !== null) {
                switch (action.payload.type) {
                    case 'local':
                        tbRtcClient.domManager.setVideo('local', action.payload.element);
                        tbRtcClient.bindWithLocalVideo();
                        break;
                    case 'remote':
                        tbRtcClient.domManager.setVideo('remote', action.payload.element);
                        tbRtcClient.bindWithRemoteVideo();
                        break;
                }
            }
            break;
        case SET_FILE_INPUT:
            if (tbRtcClient !== null) {
                tbRtcClient.addFileInput(action.payload.fileInput);
            }
            break;
        case SEND_CHAT_MESSAGE:
            if (tbRtcClient !== null) {
                tbRtcClient.sendChatMessage(action.payload.message.content);
            }
            break;
        case START_SELECTING_FILES:
            const observedFile = tbRtcClient.getObservedFileInput(action.payload.fileId);
            if (observedFile) {
                observedFile.openDialog();
            }
            break;
        case TALK_SESSION_STOP: {
            const result = next(action);
            if (tbRtcClient !== null && tbRtcClient.hasSignalingConnection) {
                tbRtc.closeSession();
                store.dispatch(endTalk());
            }
            return result;
        }
    }
    return next(action);
};