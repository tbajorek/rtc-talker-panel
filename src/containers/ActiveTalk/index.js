import {connect} from 'react-redux';

import {withRouter} from "react-router";
import ActiveTalk from "../../components/ActiveTalk";
import UserModel from "../../models/User";
import {getLoggedUser} from "../../reducers/loggedUser";
import {
    endTalk,
    sendChatMessage, setActiveTalk, setFileInput,
    setMutedAudio,
    setMutedVideo,
    setVideo,
    setVolumeLevel,
    startedTalk, startSelectingFiles, talkStop
} from "../../actions/talk";
import {
    getFileList,
    getMessageList,
    getRemoteUser,
    getTalkType,
    getUserDomain,
    getUserSiteUrl, getVolumeLevel, isMutedAudio, isMutedVideo
} from "../../reducers/talk";

const mapStateToProps = state => ({
    currentUser: getLoggedUser(state),
    remoteUser: getRemoteUser(state) ? getRemoteUser(state) : new UserModel('12', 'Janusz', 'Biznesu', 'janusz@example.com', 'https://avatarmaker.com/svgavatars/temp-avatars/svgA6119304512517854.png'),
    messages: getMessageList(state),
    domain: getUserDomain(state),
    siteUrl: getUserSiteUrl(state),
    talkType: getTalkType(state) ? getTalkType(state) : 'chat',
    mutedAudio: isMutedAudio(state),
    mutedVideo: isMutedVideo(state),
    volumeLevel: getVolumeLevel(state)
});

const mapDispatchToProps = {
    sendMessage: sendChatMessage,
    talkStop: talkStop,
    startedTalk: startedTalk,
    setVideo: setVideo,
    setMutedAudio: setMutedAudio,
    setMutedVideo: setMutedVideo,
    setVolumeLevel: setVolumeLevel,
    startSelectingFiles: startSelectingFiles,
    setFileInput: setFileInput
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActiveTalk));