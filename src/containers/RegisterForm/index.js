import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';

import RegisterForm from '../../components/RegisterForm';
import {withRouter} from "react-router";
import {isRegisterLoading} from "../../reducers/auth";

const mapStateToProps = state => ({
  registerLoading: isRegisterLoading(state)
});

const mapDispatchToProps = {
  signUp: authActions.signUp,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterForm));