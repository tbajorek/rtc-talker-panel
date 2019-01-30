import { assert } from 'chai';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as talkActions from '../../src/actions/talk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions > talk', () => {
    describe('#anyTalkErrorOccured()', () => {
        it('should create ANY_ERROR_WITH_TALK action', () => {
            const message = 'ERROR';
            const action = talkActions.anyTalkErrorOccured(message);
            const actionObject = {
                type: talkActions.ANY_ERROR_WITH_TALK,
                error: true,
                payload: {
                    message,
                    title: "Problem z komunikacją"
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#requestForSession()', () => {
        it('should create REQUEST_FOR_SESSION action', () => {
            const userId = 15;
            const action = talkActions.requestForSession(userId);
            const actionObject = {
                type: talkActions.REQUEST_FOR_SESSION,
                error: false,
                payload: {
                    userId
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#talkSessionStart()', () => {
        it('should create TALK_SESSION_START action', () => {
            const sessionId = 16;
            const action = talkActions.talkSessionStart(sessionId);
            const actionObject = {
                type: talkActions.TALK_SESSION_START,
                error: false,
                payload: {
                    sessionId
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#talkStop()', () => {
        it('should create TALK_SESSION_STOP action', () => {
            const store = mockStore({});

            const expectedActions = [
                {
                    type: talkActions.TALK_SESSION_STOP,
                    error: false,
                    payload: {}
                }
            ];

            store.dispatch(talkActions.talkStop());
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#startedTalk()', () => {
        it('should create STARTED_TALK action', () => {
            const action = talkActions.startedTalk();
            const actionObject = {
                type: talkActions.STARTED_TALK,
                error: false,
                payload: {}
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#endTalk()', () => {
        it('should create END_TALK action', () => {
            const store = mockStore({});

            const expectedActions = [
                {
                    type: talkActions.END_TALK,
                    error: false,
                    payload: {}
                }
            ];

            store.dispatch(talkActions.endTalk());
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#setTalkType()', () => {
        it('should create SET_TALK_TYPE action', () => {
            const type = 'video';
            const action = talkActions.setTalkType(type);
            const actionObject = {
                type: talkActions.SET_TALK_TYPE,
                error: false,
                payload: {
                    type
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#requestForTalk()', () => {
        it('should create REQUEST_FOR_TALK action', () => {
            const request = {name: 'Test'};
            const action = talkActions.requestForTalk(request);
            const actionObject = {
                type: talkActions.REQUEST_FOR_TALK,
                error: false,
                payload: {
                    request
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#acceptRequestedTalk()', () => {
        it('should create ACCEPT_TALK action', () => {
            const action = talkActions.acceptRequestedTalk();
            const actionObject = {
                type: talkActions.ACCEPT_TALK,
                error: false,
                payload: {}
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#rejectRequestedTalk()', () => {
        it('should create REJECT_TALK and TALK_SESSION_STOP actions', () => {
            const store = mockStore({});

            const expectedActions = [
                {
                    type: talkActions.REJECT_TALK,
                    error: false,
                    payload: {}
                }, {
                    type: talkActions.TALK_SESSION_STOP,
                    error: false,
                    payload: {}
                }
            ];

            store.dispatch(talkActions.rejectRequestedTalk());
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#sendChatMessage()', () => {
        it('should create SEND_CHAT_MESSAGE action', () => {
            const message = 'message';
            const action = talkActions.sendChatMessage(message);
            const actionObject = {
                type: talkActions.SEND_CHAT_MESSAGE,
                error: false,
                payload: {
                    message
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#receiveChatMessage()', () => {
        it('should create RECEIVE_CHAT_MESSAGE action', () => {
            const message = {_clone: () => message};
            const action = talkActions.receiveChatMessage(message);
            const actionObject = {
                type: talkActions.RECEIVE_CHAT_MESSAGE,
                error: false,
                payload: {
                    message
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#setVideo()', () => {
        it('should create SET_VIDEO action', () => {
            const type = 'type';
            const element = 'element';
            const action = talkActions.setVideo(type, element);
            const actionObject = {
                type: talkActions.SET_VIDEO,
                error: false,
                payload: {
                    type, element
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#setFileInput()', () => {
        it('should create SET_FILE_INPUT action', () => {
            const fileInput = 'fileInput';
            const action = talkActions.setFileInput(fileInput);
            const actionObject = {
                type: talkActions.SET_FILE_INPUT,
                error: false,
                payload: {
                    fileInput
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#setMutedAudio()', () => {
        it('should create SET_MUTED_AUDIO action', () => {
            const value = 'value';
            const action = talkActions.setMutedAudio(value);
            const actionObject = {
                type: talkActions.SET_MUTED_AUDIO,
                error: false,
                payload: {
                    value
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#setMutedVideo()', () => {
        it('should create SET_MUTED_VIDEO action', () => {
            const value = 'value';
            const action = talkActions.setMutedVideo(value);
            const actionObject = {
                type: talkActions.SET_MUTED_VIDEO,
                error: false,
                payload: {
                    value
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#setVolumeLevel()', () => {
        it('should create SET_VOLUME_LEVEL action', () => {
            const level = 'level';
            const action = talkActions.setVolumeLevel(level);
            const actionObject = {
                type: talkActions.SET_VOLUME_LEVEL,
                error: false,
                payload: {
                    level
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#startSelectingFiles()', () => {
        it('should create START_SELECTING_FILES action', () => {
            const fileId = 'fileId';
            const action = talkActions.startSelectingFiles(fileId);
            const actionObject = {
                type: talkActions.START_SELECTING_FILES,
                error: false,
                payload: {
                    fileId
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#startTransferFile()', () => {
        it('should create FILE_TRANSFER_START action', () => {
            const id = 'id';
            const type = 'type';
            const info = 'info';
            const action = talkActions.startTransferFile(id, type, info);
            const actionObject = {
                type: talkActions.FILE_TRANSFER_START,
                error: false,
                payload: {
                    id, type, info
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#updateTransferFile()', () => {
        it('should create FILE_TRANSFER_UPDATE action', () => {
            const id = 'id';
            const stats = 'stats';
            const action = talkActions.updateTransferFile(id, stats);
            const actionObject = {
                type: talkActions.FILE_TRANSFER_UPDATE,
                error: false,
                payload: {
                    id, stats
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#finishTransferFile()', () => {
        it('should create FILE_TRANSFER_FINISH action', () => {
            const id = 'id';
            const action = talkActions.finishTransferFile(id);
            const actionObject = {
                type: talkActions.FILE_TRANSFER_FINISH,
                error: false,
                payload: {
                    id
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#setActiveTalk()', () => {
        it('should create SET_ACTIVE_TALK action', () => {
            const activeTalk = 'activeTalk';
            const action = talkActions.setActiveTalk(activeTalk);
            const actionObject = {
                type: talkActions.SET_ACTIVE_TALK,
                error: false,
                payload: {
                    activeTalk
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#setDomainInfo()', () => {
        it('should create SET_DOMAIN_INFO action', () => {
            const domain = 'domain';
            const siteUrl = 'siteUrl';
            const action = talkActions.setDomainInfo(domain, siteUrl);
            const actionObject = {
                type: talkActions.SET_DOMAIN_INFO,
                error: false,
                payload: {
                    domain, siteUrl
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#breakTalk()', () => {
        it('should create BREAK_TALK action', () => {
            const action = talkActions.breakTalk();
            const actionObject = {
                type: talkActions.BREAK_TALK,
                error: false,
                payload: {}
            };
            assert.deepEqual(action, actionObject);
        });
    });
});