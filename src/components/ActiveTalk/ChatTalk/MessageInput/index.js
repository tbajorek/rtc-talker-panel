import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Tooltip } from 'antd';
import MessageMenu from './MessageMenu';
import './style.less';
import ui from "redux-ui";
import ChatMessage from "../../../../models/ChatMessage";
import ReactDOM from "react-dom";

const { TextArea } = Input;

@ui({
    key: 'messageForm',
    state: {
        message: '',
    }
})
class MessageInput extends React.Component {
    constructor(props) {
        super(props);
        this._fileInput = null;
    }
    setFileInput(element) {
        if (!this._fileInput) {
            this._fileInput = element;
            this.props.setFileInput(ReactDOM.findDOMNode(element));
        }
    }
    sendMessageFn(currentUser, message, sendMessage) {
        if(message !== '') {
            this.props.updateUI('message', '');
            sendMessage(new ChatMessage(currentUser.id, message.trim(), new Date()));
        }
    }
    render() {
        const {currentUser, sendMessage, startSelectingFiles} = this.props;
        const { message } = this.props.ui;
        return (
            <React.Fragment>
                <div className="message-input">
                    <MessageMenu startSelectingFiles={() => startSelectingFiles('fileInput')}/>
                    <TextArea value={message} placeholder="Napisz wiadomość..." onChange={e => this.props.updateUI('message', e.target.value)} autosize={{ minRows: 1, maxRows: 4 }} onPressEnter={(e) => {
                        this.sendMessageFn(currentUser, message, sendMessage);
                        e.preventDefault();
                        e.stopPropagation();
                    }} />
                    <div className="input-suffix">
                        <Tooltip title="Wyślij wiadomość">
                            <Button className="send-message-button" icon="right" onClick={() => {
                                this.sendMessageFn(currentUser, message, sendMessage);
                            }} />
                        </Tooltip>
                    </div>
                </div>
                <input id="fileInput" type="file" ref={this.setFileInput.bind(this)} />
            </React.Fragment>
        );
    }
}

MessageInput.propTypes = {
    currentUser: PropTypes.shape({
        avatar: PropTypes.string,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
    }).isRequired,
    sendMessage: PropTypes.func.isRequired,
    startSelectingFiles: PropTypes.func.isRequired,
};

export default MessageInput;
