import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import './style.less';
import PropTypes from 'prop-types';


const ChatTalk = ({
                      currentUser, remoteUser, messages, sendMessage, startSelectingFiles, setFileInput
                  }) => (
    <div className="chat-area">
        <Messages currentUser={currentUser} remoteUser={remoteUser} messages={messages}/>
        <MessageInput currentUser={currentUser} sendMessage={sendMessage} startSelectingFiles={startSelectingFiles} setFileInput={setFileInput} />
    </div>
);

ChatTalk.propTypes = {
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
    sendMessage: PropTypes.func.isRequired,
    startSelectingFiles: PropTypes.func.isRequired,
    setFileInput: PropTypes.func.isRequired,
};

export default ChatTalk;
