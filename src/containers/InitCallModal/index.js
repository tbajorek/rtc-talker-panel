import { connect } from 'react-redux';
import * as talkActions from '../../actions/talk';

import {withRouter} from "react-router";
import InitCallModal from "../../components/InitCallModal";
import {getRemoteUser, getTalkType, isLoadingCall, isTalkRequest} from "../../reducers/talk";

const mapStateToProps = state => ({
    user: getRemoteUser(state),
    isTalkRequest: isTalkRequest(state),
    loadingCall: isLoadingCall(state),
    type: getTalkType(state)
});

const mapDispatchToProps = {
    onAcceptTalk: talkActions.acceptRequestedTalk,
    onRejectTalk: talkActions.rejectRequestedTalk,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InitCallModal));