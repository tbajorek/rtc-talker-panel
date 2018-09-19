import React from 'react';
import PropTypes from 'prop-types';
import SingleMessage from './SingleMessage';
import './style.less';

const Messages = ({ currentUser, remoteUser, messages }) => {
    let key = 0;
    const htmlMessages = messages.map((message) => {
        const author = currentUser.id === message.authorId ? currentUser : remoteUser;
        return (<SingleMessage
            currentUser={currentUser}
            author={author}
            content={message.content}
            date={message.date}
            key={key++}
        />);
    });
    return (
        <div className="message-list">
            { htmlMessages }
        </div>
    );
};
export default Messages;

Messages.propTypes = {
    currentUser: PropTypes.shape({
        avatar: PropTypes.string,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
    }).isRequired,
    remoteUser: PropTypes.shape({
        avatar: PropTypes.string,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
    }).isRequired,
    messages: PropTypes.array.isRequired,
};


/**
 message:
 * authorId,
 * content
 * date
 */
