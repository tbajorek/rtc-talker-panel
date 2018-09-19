import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';

import LoginForm from '../../components/LoginForm';
import {withRouter} from "react-router";
import {isLoginLoading} from "../../reducers/auth";

const mapStateToProps = state => ({
    loginLoading: isLoginLoading(state)
});

const mapDispatchToProps = {
  signIn: authActions.signIn,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));