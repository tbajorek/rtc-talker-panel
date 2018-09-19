import React from 'react';
import PropTypes from 'prop-types';
import MessageContent from './MessageContent';

import './style.less';

const SingleMessage = ({
                           currentUser, author, content, date,
                       }) => {
    const messageType = currentUser.id === author.id ? 'outgoing' : 'incoming';
    return (
        <div className="single-message">
            <MessageContent author={author} content={content} type={messageType} />
            <div className="footer">
                <div className="menu-filler" />
                <div className="message-date">{date}</div>
            </div>
        </div>
    );
};

SingleMessage.propTypes = {
    currentUser: PropTypes.shape({
        avatar: PropTypes.string,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
    }).isRequired,
    author: PropTypes.shape({
        avatar: PropTypes.string,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

export default SingleMessage;
