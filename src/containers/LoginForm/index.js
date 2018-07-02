import { connect } from 'react-redux';
import * as authActions from '../../actions/auth';

import LoginForm from '../../components/LoginForm';

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
  signIn: authActions.signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
