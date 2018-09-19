import ActionCreator from "tbrtc-common/utilities/ActionCreator";

export const SET_INITIALIZATION_STEP = 'SET_INITIALIZATION_STEP';

export const setInitializationStep = step => ActionCreator.createAction(SET_INITIALIZATION_STEP, { step });