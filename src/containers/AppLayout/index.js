import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { getLoggedUser } from '../../reducers/loggedUser';
import AppLayout from '../../components/AppLayout';


const mapStateToProps = state => ({
  loggedUser: getLoggedUser(state)
});

const mapDispatchToProps = {

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppLayout));
