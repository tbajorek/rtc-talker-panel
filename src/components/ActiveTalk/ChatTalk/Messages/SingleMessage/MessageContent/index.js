import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import emotes from 'emote-icons';
import 'emote-icons/src/emote-icons-sm.css';
import ExtendedAvatar from '../../../../../ExtendedAvatar';
import './style.less';

const OutgoingContent = ({author, content, className}) => (
    <div className="main">
        <div className={className}>{content}</div>
        <ExtendedAvatar className="message-avatar" user={author} />
    </div>
);

const IncomingContent = ({author, content, className}) => (
    <div className="main">
        <ExtendedAvatar className="message-avatar" user={author} />
        <div className={className}>{content}</div>
    </div>
);

const MessageContent = ({
                            author, content, type,
                        }) => {
    const className = `message-content ${type}`;
    const parsedContent = ReactHtmlParser(emotes(content));

    if (type === 'outgoing') {
        return <OutgoingContent author={author} content={parsedContent} className={className} />
    } else {
        return <IncomingContent author={author} content={parsedContent} className={className} />
    }
};

MessageContent.propTypes = {
    author: PropTypes.shape({
        avatar: PropTypes.string,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};


export default MessageContent;
