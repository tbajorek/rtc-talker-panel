import React from 'react';
import MediaContainer from "./MediaContainer";
import VolumeControl from "./VolumeControl";

class MediaTalk extends React.Component {
    render() {
        const {talkType, mutedVideo, volumeLevel, mutedAudio, setVolumeLevel, setMutedVideo, setMutedAudio, startedTalk, setVideo} = this.props;
        return (
            <div className="media-talk">
                <MediaContainer talkType={talkType} mutedVideo={mutedVideo} startedTalk={startedTalk} setVideo={setVideo}/>
                <VolumeControl talkType={talkType} volumeLevel={volumeLevel} mutedAudio={mutedAudio}
                               mutedVideo={mutedVideo} setVolumeLevel={setVolumeLevel} setMutedAudio={setMutedAudio}
                               setMutedVideo={setMutedVideo}/>
            </div>
        );
    }
}

export default MediaTalk;