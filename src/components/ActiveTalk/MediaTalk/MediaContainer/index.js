import React from 'react';
import ReactDOM from 'react-dom';
import PhoneContainer from '../PhoneContainer';
import './style.less';

class MediaTalk extends React.Component {
    constructor(props) {
        super(props);
        this._localVideo = null;
        this._remoteVideo = null;
    }

    componentDidMount() {
        this.props.startedTalk();
    }

    setLocalVideo(element) {
        if (!this._localVideo) {
            this._localVideo = element;
            this.props.setVideo('local', ReactDOM.findDOMNode(element));
        }
    }

    setRemoteVideo(element) {
        if (!this._remoteVideo) {
            this._remoteVideo = element;
            this.props.setVideo('remote', ReactDOM.findDOMNode(element));
        }
    }

    render() {
        const {talkType, mutedVideo} = this.props;
        return (
            <div className="media-container">
                {talkType === 'video'
                    ? <React.Fragment>
                        <video className={`remote-video${mutedVideo ? ' muted' : ''}`} id="remoteVideo" ref={this.setRemoteVideo.bind(this)}/>
                        <video className={`local-video${mutedVideo ? ' muted' : ''}`} id="localVideo" muted="true"
                               ref={this.setLocalVideo.bind(this)}/>
                        {mutedVideo ? <PhoneContainer /> : null}
                    </React.Fragment>
                    : null
                }
                {talkType === 'audio'
                    ? <React.Fragment>
                        <video className="remote-video muted" id="remoteVideo" ref={this.setRemoteVideo.bind(this)}/>
                        <PhoneContainer />
                    </React.Fragment>
                    : null
                }
            </div>
        );
    }
}

export default MediaTalk;