import {withRouter} from "react-router";
import connect from "react-redux/es/connect/connect";
import Initialization from "../../components/Initialization";
import {getInitStep} from "../../reducers/initialization";
import {getLoggedUser} from "../../reducers/loggedUser";
import {addMyAddress} from "../../actions/profile";
import {addMyCompany} from "../../actions/company";

const mapStateToProps = state => ({
    loggedUser: getLoggedUser(state),
    step: getInitStep(state),
});

const mapDispatchToProps = {
    addMyAddress,
    addMyCompany,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Initialization));