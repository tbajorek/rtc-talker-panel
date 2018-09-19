import { connect } from 'react-redux';
import {getLoggedUser, getToken} from '../../reducers/loggedUser';
import { changeAvailability, setOnlineStatus } from '../../actions/availability';
import Availability from "../../components/Availability";
import {isChangingOnline, isOnline} from "../../reducers/online";
import {withRouter} from "react-router";


const mapStateToProps = state => ({
    availability: getLoggedUser(state).availability,
    currentUser: getLoggedUser(state),
    userId: getLoggedUser(state).id,
    token: getToken(state),
    changingOnline: isChangingOnline(state),
    online: isOnline(state)
});

const mapDispatchToProps = {
    changeAvailability,
    setOnlineStatus
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Availability));