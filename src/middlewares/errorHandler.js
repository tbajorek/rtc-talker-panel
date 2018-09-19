import Messages from '../utils/Messages';

export default store => next => (action) => {
    if (action.error === true) {
        const { title, message } = action.payload;
        Messages.error(title, message);
    }
    return next(action);
};