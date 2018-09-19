import { notification } from 'antd';

class Messages {
    static error(title, message) {
        notification.error(Messages._getOptions(title, message));
    }

    static warning(title, message) {
        notification.warning(Messages._getOptions(title, message));
    }

    static info(title, message) {
        notification.info(Messages._getOptions(title, message));
    }

    static success(title, message) {
        notification.success(Messages._getOptions(title, message));
    }

    static _getOptions(title, message) {
        return {
            message: title,
            description: message,
            placement: 'bottomLeft',
            duration: 3
        };
    }
}

export default Messages;