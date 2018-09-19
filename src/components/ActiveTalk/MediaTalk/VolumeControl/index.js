import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip, Button, Slider} from 'antd';
import './style.less';

const VolumeControl = ({
                           talkType, volumeLevel, mutedAudio, mutedVideo, setVolumeLevel, setMutedAudio, setMutedVideo,
                       }) => (
    <div className="talker-volume">
        {talkType === 'video' ?
            <Tooltip title={`${mutedVideo ? 'Włącz' : 'Wyłącz'} wideo`}>
                <Button className={`video-button ${mutedVideo ? 'off' : 'on'}`} icon="eye-o"
                        onClick={() => setMutedVideo(!mutedVideo)}/>
            </Tooltip>
            : null}
        <Tooltip title={`${mutedAudio ? 'Włącz' : 'Wyłącz'} audio`}>
            <Button className={`volume-button ${mutedAudio ? 'off' : 'on'}`} icon="sound"
                    onClick={() => setMutedAudio(!mutedAudio)}/>
        </Tooltip>
        <Slider className="volume-slider" min={0} max={100} disabled={mutedAudio} onChange={setVolumeLevel}
                value={volumeLevel}/>
    </div>
);

VolumeControl.propTypes = {
    talkType: PropTypes.string.isRequired,
    volumeLevel: PropTypes.number.isRequired,
    mutedVideo: PropTypes.bool.isRequired,
    mutedAudio: PropTypes.bool.isRequired,
    setVolumeLevel: PropTypes.func.isRequired,
    setMutedAudio: PropTypes.func.isRequired,
    setMutedVideo: PropTypes.func.isRequired,
};

export default VolumeControl;
