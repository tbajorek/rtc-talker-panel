import { assert } from 'chai';
import createTestStore from '../createTestStore';

import reducer from '../../src/reducers/talk';
import * as talkActions from '../../src/actions/talk';
import ChatMessage from "../../src/models/ChatMessage";

describe('reducers > talk', () => {
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
        finishing: false,
        brokenTalk: false
    };

    it('should return the initial state', () => {
        const returnedState = reducer(undefined, {});
        assert.deepEqual(returnedState, initialState);
    });

    it('should handle REQUEST_FOR_SESSION action', () => {
        const userId = 1;
        const returnedState = reducer(initialState, talkActions.requestForSession(userId));
        assert.deepEqual(returnedState, {...initialState, sessionRequest: userId});
    });

    it('should handle SET_DOMAIN_INFO action', () => {
        const domain = 'domain';
        const siteUrl = 'siteUrl';
        const returnedState = reducer(initialState, talkActions.setDomainInfo(domain, siteUrl));
        assert.deepEqual(returnedState, {...initialState, domain, siteUrl});
    });

    it('should handle TALK_SESSION_START action', () => {
        const sessionId = 1;
        const returnedState = reducer(initialState, talkActions.talkSessionStart(sessionId));
        assert.deepEqual(returnedState, {...initialState, sessionId});
    });

    it('should handle TALK_SESSION_STOP action', () => {
        const store = createTestStore(reducer, initialState);

        store.dispatch(talkActions.talkStop());
        assert.deepEqual(store.getState(), {
            ...initialState,
            finishing: true
        });
    });

    it('should handle SET_TALK_TYPE action', () => {
        const type = 'audio';
        const returnedState = reducer(initialState, talkActions.setTalkType(type));
        assert.deepEqual(returnedState, {...initialState, type});
    });

    it('should handle REQUEST_FOR_TALK action', () => {
        const request = {
            a: 1, b: 'test',
            requestMessage: {
                user: {name: 'name', surname: 'surname'}
            }
        };
        const returnedState = reducer(initialState, talkActions.requestForTalk(request));
        assert.deepEqual(returnedState, {
            ...initialState,
            requestObject: request,
            remoteUser: request.requestMessage.user,
            talkRequest: true
        });
    });

    it('should handle ACCEPT_TALK action', () => {
        const returnedState = reducer(initialState, talkActions.acceptRequestedTalk());
        assert.deepEqual(returnedState, {...initialState, loadingCall: true, requestObject: null, talkRequest: false});
    });

    it('should handle REJECT_TALK action', () => {
        const returnedState = reducer(initialState, talkActions.rejectRequestedTalk());
        assert.deepEqual(returnedState, {
            ...initialState,
            remoteUser: null, requestObject: null, type: null, talkRequest: false
        });
    });

    it('should handle STARTED_TALK action', () => {
        const returnedState = reducer(initialState, talkActions.startedTalk());
        assert.deepEqual(returnedState, {...initialState, loadingCall: false});
    });

    it('should handle RECEIVE_CHAT_MESSAGE action', () => {
        const message1 = new ChatMessage('154', 'content', '21-01-2019');
        const message2 = new ChatMessage('1541', 'content2', '21-01-2019');
        const returnedState = reducer(initialState, talkActions.receiveChatMessage(message1));
        assert.deepEqual(returnedState, {...initialState, messages: [message1]});

        const returnedState2 = reducer(returnedState, talkActions.receiveChatMessage(message2));
        assert.deepEqual(returnedState2, {...initialState, messages: [message1, message2]});
    });

    it('should handle END_TALK action', () => {
        const store = createTestStore(reducer, initialState);

        store.dispatch(talkActions.endTalk());
        assert.deepEqual(store.getState(), initialState);
    });

    it('should set local video object', () => {
        const type = 'local';
        const element = {a: 1, b: 2};
        const returnedState = reducer(initialState, talkActions.setVideo(type, element));
        assert.deepEqual(returnedState, {...initialState, video: {...initialState.video, [type]: element}});
    });

    it('should set remote video object', () => {
        const type = 'remote';
        const element = {a: 1, b: 2};
        const returnedState = reducer(initialState, talkActions.setVideo(type, element));
        assert.deepEqual(returnedState, {...initialState, video: {...initialState.video, [type]: element}});
    });

    it('should handle SET_MUTED_AUDIO action', () => {
        const mutedAudio = !initialState.mutedAudio;
        const returnedState = reducer(initialState, talkActions.setMutedAudio(mutedAudio));
        assert.deepEqual(returnedState, {...initialState, mutedAudio});
    });

    it('should handle SET_MUTED_AUDIO action', () => {
        const mutedVideo = !initialState.mutedVideo;
        const returnedState = reducer(initialState, talkActions.setMutedVideo(mutedVideo));
        assert.deepEqual(returnedState, {...initialState, mutedVideo});
    });

    it('should handle SET_VOLUME_LEVEL action', () => {
        const volumeLevel = 20;
        const returnedState = reducer(initialState, talkActions.setVolumeLevel(volumeLevel));
        assert.deepEqual(returnedState, {...initialState, volumeLevel});
    });

    it('should handle FILE_TRANSFER_START action', () => {
        const id = '44ds';
        const type = 'type';
        const info = {a: 1, b: 2};
        const returnedState = reducer(initialState, talkActions.startTransferFile(id, type, info));
        assert.deepEqual(returnedState, {...initialState, files: {
            ...initialState.files,
                [id]: {
                    type, info, stats: null
                }
            }
        });
    });

    it('should handle FILE_TRANSFER_UPDATE action', () => {
        const id = '44ds';
        const type = 'type';
        const info = {a: 1, b: 2};
        const stats = {c: 1, d: 2};
        const returnedState = reducer(initialState, talkActions.startTransferFile(id, type, info));

        const returnedState2 = reducer(returnedState, talkActions.updateTransferFile(id, stats));
        assert.deepEqual(returnedState2, {...initialState, files: {
                ...initialState.files,
                [id]: {
                    type, info, stats
                }
            }
        });
    });

    it('should handle FILE_TRANSFER_FINISH action', () => {
        const id = '44ds';
        const type = 'type';
        const info = {a: 1, b: 2};
        const stats = {c: 1, d: 2};
        const returnedState = reducer({...initialState, files: {
                ...initialState.files,
                [id]: {
                    type, info, stats
                }
            }
        }, talkActions.startTransferFile(id, type, info));

        const returnedState2 = reducer(returnedState, talkActions.finishTransferFile(id));
        assert.deepEqual(returnedState2, initialState);
    });

    it('should handle SET_FILE_INPUT action', () => {
        const fileInput = {a: 1, b: 2};
        const returnedState = reducer(initialState, talkActions.setFileInput(fileInput));
        assert.deepEqual(returnedState, {...initialState, fileInput});
    });

    it('should handle SET_ACTIVE_TALK action', () => {
        const activeTalk = !initialState.activeTalk;
        const returnedState = reducer(initialState, talkActions.setActiveTalk(activeTalk));
        assert.deepEqual(returnedState, {...initialState, activeTalk});
    });

    it('should handle BREAK_TALK action', () => {
        const returnedState = reducer(initialState, talkActions.breakTalk());
        assert.deepEqual(returnedState, {...initialState, brokenTalk: true});
    });
});