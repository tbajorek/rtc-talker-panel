import React from 'react';
import {Row, Col} from 'antd';
import ChatTalk from "./ChatTalk";
import MediaTalk from "./MediaTalk";
import HeaderTalk from "./HeaderTalk";
import './style.less';

const isMediaTalk = (talkType) => ['video', 'audio'].indexOf(talkType) >= 0;

class ActiveTalk extends React.Component {

    render() {
        const {
            remoteUser, currentUser, messages, sendMessage, startSelectingFiles, talkStop,
            talkType, startedTalk, setVideo, setFileInput, volumeLevel, mutedAudio, mutedVideo,
            setVolumeLevel, setMutedAudio, setMutedVideo
        } = this.props;
        return (
            <React.Fragment>
                <Row>
                    <HeaderTalk remoteUser={remoteUser} talkStop={talkStop} talkType={talkType} volumeLevel={volumeLevel}
                                mutedAudio={mutedAudio} mutedVideo={mutedVideo} setVolumeLevel={setVolumeLevel}
                                setMutedAudio={setMutedAudio} setMutedVideo={setMutedVideo}/>
                </Row>
                <Row className="active-talk">
                    {isMediaTalk(talkType)
                        ? <Col span={9}>
                            <MediaTalk startedTalk={startedTalk} setVideo={setVideo} talkType={talkType}
                                       mutedVideo={mutedVideo} volumeLevel={volumeLevel}
                                       mutedAudio={mutedAudio}
                                       setVolumeLevel={setVolumeLevel} setMutedAudio={setMutedAudio}
                                       setMutedVideo={setMutedVideo}/>
                        </Col>
                        : null
                    }
                    <Col span={isMediaTalk(talkType) ? 15 : 24}>
                        <ChatTalk currentUser={currentUser} remoteUser={remoteUser} messages={messages}
                                  sendMessage={sendMessage} startSelectingFiles={startSelectingFiles} setFileInput={setFileInput}/>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default ActiveTalk;