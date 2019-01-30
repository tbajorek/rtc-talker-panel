import { assert } from 'chai';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as usersActions from "../../src/actions/users";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions > users', () => {
    describe('#updateMyUser()', () => {
        it('should create UPDATE_MY_USER action', () => {
            const unclearUser = {id: 5, name: 'name', surname: 'surname', _test: 'none', error: false};
            const clearUser = {id: 5, key: 5, name: 'name', surname: 'surname', fullName: 'name surname'};
            const action = usersActions.updateMyUser(unclearUser);
            const actionObject = {
                type: usersActions.UPDATE_MY_USER,
                error: false,
                payload: {
                    ...clearUser
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#updateAllUser()', () => {
        it('should create UPDATE_ALL_USER action', () => {
            const unclearUser = {id: 5, name: 'name', surname: 'surname', _test: 'none', error: false};
            const clearUser = {id: 5, key: 5, name: 'name', surname: 'surname', fullName: 'name surname'};
            const action = usersActions.updateAllUser(unclearUser);
            const actionObject = {
                type: usersActions.UPDATE_ALL_USER,
                error: false,
                payload: {
                    ...clearUser
                }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#getUsersForCompRequest()', () => {
        it('should create GET_USERS_FOR_COMP_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = usersActions.getUsersForCompRequest(payload);
            const actionObject = {
                type: usersActions.GET_USERS_FOR_COMP_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#getUsersForCompSuccess()', () => {
        it('should create GET_USERS_FOR_COMP_SUCCESS action', () => {
            const store = mockStore({});
            const payload = {users: [
                    {id: 1, name: 'name1', surname: 'surname1'},
                    {id: 2, name: 'name2', surname: 'surname2'}
                ], _requestPayload: {
                    companyId: 5
                }
            };

            const expectedActions = [
                {
                    type: usersActions.GET_USERS_FOR_COMP_SUCCESS,
                    error: false,
                    payload: {users: [
                            {id: 1, key: 1, name: 'name1', surname: 'surname1', fullName: 'name1 surname1'},
                            {id: 2, key: 2, name: 'name2', surname: 'surname2', fullName: 'name2 surname2'}
                        ], companyId: 5
                    }
                }
            ];

            store.dispatch(usersActions.getUsersForCompSuccess(payload));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#getUsersForCompFailure()', () => {
        it('should create GET_USERS_FOR_COMP_FAILURE action', () => {
            const payload = { message: 'ERROR' };
            const action = usersActions.getUsersForCompFailure(payload);
            const actionObject = {
                type: usersActions.GET_USERS_FOR_COMP_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Nie udało się pobrać listy użytkowników Twojej firmy" }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#getMyUsersRequest()', () => {
        it('should create GET_MY_USERS_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = usersActions.getMyUsersRequest(payload);
            const actionObject = {
                type: usersActions.GET_MY_USERS_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#getMyUsersSuccess()', () => {
        it('should create GET_MY_USERS_SUCCESS action', () => {
            const store = mockStore({});
            const payload = {users: [
                    {id: 1, name: 'name1', surname: 'surname1'},
                    {id: 2, name: 'name2', surname: 'surname2'}
                ]
            };

            const expectedActions = [
                {
                    type: usersActions.GET_MY_USERS_SUCCESS,
                    error: false,
                    payload: [
                        {id: 1, key: 1, name: 'name1', surname: 'surname1', fullName: 'name1 surname1'},
                        {id: 2, key: 2, name: 'name2', surname: 'surname2', fullName: 'name2 surname2'}
                    ]
                }
            ];

            store.dispatch(usersActions.getMyUsersSuccess(payload));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#getMyUsersFailure()', () => {
        it('should create GET_MY_USERS_FAILURE action', () => {
            const payload = { message: 'ERROR' };
            const action = usersActions.getMyUsersFailure(payload);
            const actionObject = {
                type: usersActions.GET_MY_USERS_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Nie udało się pobrać listy użytkowników Twojej firmy" }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#getAllUsersRequest()', () => {
        it('should create GET_ALL_USERS_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = usersActions.getAllUsersRequest(payload);
            const actionObject = {
                type: usersActions.GET_ALL_USERS_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#getAllUsersSuccess()', () => {
        it('should create GET_ALL_USERS_SUCCESS action', () => {
            const store = mockStore({});
            const payload = {users: [
                    {id: 1, name: 'name1', surname: 'surname1'},
                    {id: 2, name: 'name2', surname: 'surname2'}
                ]
            };

            const expectedActions = [
                {
                    type: usersActions.GET_ALL_USERS_SUCCESS,
                    error: false,
                    payload: [
                        {id: 1, key: 1, name: 'name1', surname: 'surname1', fullName: 'name1 surname1'},
                        {id: 2, key: 2, name: 'name2', surname: 'surname2', fullName: 'name2 surname2'}
                    ]
                }
            ];

            store.dispatch(usersActions.getAllUsersSuccess(payload));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#getAllUsersFailure()', () => {
        it('should create GET_ALL_USERS_FAILURE action', () => {
            const payload = { message: 'ERROR' };
            const action = usersActions.getAllUsersFailure(payload);
            const actionObject = {
                type: usersActions.GET_ALL_USERS_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Nie udało się pobrać listy użytkowników systemu" }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#setMyActivatedRequest()', () => {
        it('should create SET_ACTIVATED_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = usersActions.setMyActivatedRequest(payload);
            const actionObject = {
                type: usersActions.SET_ACTIVATED_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#setMyActivatedSuccess()', () => {
        it('should create SET_ACTIVATED_SUCCESS action', () => {
            const store = mockStore({});
            const unclearUser = {id: 1, name: 'name1', surname: 'surname1'};
            const clearUser = {id: 1, key: 1, name: 'name1', surname: 'surname1', fullName: 'name1 surname1'};

            const expectedActions = [
                {
                    type: usersActions.SET_ACTIVATED_SUCCESS,
                    error: false,
                    payload: clearUser
                }, {
                    type: usersActions.UPDATE_MY_USER,
                    error: false,
                    payload: clearUser
                }
            ];

            store.dispatch(usersActions.setMyActivatedSuccess(unclearUser));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#setMyActivatedFailure()', () => {
        it('should create SET_ACTIVATED_FAILURE action', () => {
            const payload = { message: 'ERROR' };
            const action = usersActions.setMyActivatedFailure(payload);
            const actionObject = {
                type: usersActions.SET_ACTIVATED_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Nie udało się aktywować użytkownika" }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#setAllActivatedRequest()', () => {
        it('should create SET_ACTIVATED_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = usersActions.setAllActivatedRequest(payload);
            const actionObject = {
                type: usersActions.SET_ACTIVATED_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#setAllActivatedSuccess()', () => {
        it('should create SET_ACTIVATED_SUCCESS action', () => {
            const store = mockStore({});
            const unclearUser = {id: 1, name: 'name1', surname: 'surname1'};
            const clearUser = {id: 1, key: 1, name: 'name1', surname: 'surname1', fullName: 'name1 surname1'};

            const expectedActions = [
                {
                    type: usersActions.SET_ACTIVATED_SUCCESS,
                    error: false,
                    payload: clearUser
                }, {
                    type: usersActions.UPDATE_ALL_USER,
                    error: false,
                    payload: clearUser
                }
            ];

            store.dispatch(usersActions.setAllActivatedSuccess(unclearUser));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#setAllActivatedFailure()', () => {
        it('should create SET_ACTIVATED_FAILURE action', () => {
            const payload = { message: 'ERROR' };
            const action = usersActions.setAllActivatedFailure(payload);
            const actionObject = {
                type: usersActions.SET_ACTIVATED_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Nie udało się aktywować użytkownika" }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#changeMyUserDepartmentRequest()', () => {
        it('should create CHANGE_USER_DEPARTMENT_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = usersActions.changeMyUserDepartmentRequest(payload);
            const actionObject = {
                type: usersActions.CHANGE_USER_DEPARTMENT_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#changeMyUserDepartmentSuccess()', () => {
        it('should create CHANGE_USER_DEPARTMENT_SUCCESS action', () => {
            const store = mockStore({});
            const unclearUser = {id: 1, name: 'name1', surname: 'surname1'};
            const clearUser = {id: 1, key: 1, name: 'name1', surname: 'surname1', fullName: 'name1 surname1'};

            const expectedActions = [
                {
                    type: usersActions.CHANGE_USER_DEPARTMENT_SUCCESS,
                    error: false,
                    payload: clearUser
                }, {
                    type: usersActions.UPDATE_MY_USER,
                    error: false,
                    payload: clearUser
                }
            ];

            store.dispatch(usersActions.changeMyUserDepartmentSuccess(unclearUser));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#changeMyUserDepartmentFailure()', () => {
        it('should create CHANGE_USER_DEPARTMENT_FAILURE action', () => {
            const payload = { message: 'ERROR' };
            const action = usersActions.changeMyUserDepartmentFailure(payload);
            const actionObject = {
                type: usersActions.CHANGE_USER_DEPARTMENT_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Nie udało się przypisać departamentu" }
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#changeAllUserDepartmentRequest()', () => {
        it('should create CHANGE_USER_DEPARTMENT_REQUEST action', () => {
            const payload = {a: 1, b: 2};
            const action = usersActions.changeAllUserDepartmentRequest(payload);
            const actionObject = {
                type: usersActions.CHANGE_USER_DEPARTMENT_REQUEST,
                error: false,
                payload
            };
            assert.deepEqual(action, actionObject);
        });
    });

    describe('#changeAllUserDepartmentSuccess()', () => {
        it('should create CHANGE_USER_DEPARTMENT_SUCCESS action', () => {
            const store = mockStore({});
            const unclearUser = {id: 1, name: 'name1', surname: 'surname1'};
            const clearUser = {id: 1, key: 1, name: 'name1', surname: 'surname1', fullName: 'name1 surname1'};

            const expectedActions = [
                {
                    type: usersActions.CHANGE_USER_DEPARTMENT_SUCCESS,
                    error: false,
                    payload: clearUser
                }, {
                    type: usersActions.UPDATE_ALL_USER,
                    error: false,
                    payload: clearUser
                }
            ];

            store.dispatch(usersActions.changeAllUserDepartmentSuccess(unclearUser));
            assert.deepEqual(store.getActions(), expectedActions);
        });
    });

    describe('#changeAllUserDepartmentFailure()', () => {
        it('should create CHANGE_USER_DEPARTMENT_FAILURE action', () => {
            const payload = { message: 'ERROR' };
            const action = usersActions.changeAllUserDepartmentFailure(payload);
            const actionObject = {
                type: usersActions.CHANGE_USER_DEPARTMENT_FAILURE,
                error: true,
                payload: { message: payload.message, title: "Nie udało się przypisać departamentu" }
            };
            assert.deepEqual(action, actionObject);
        });
    });
});