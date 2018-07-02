import { connect } from 'react-redux';
import { getLocation } from '../../reducers';
import { getCurrentRoute, getCurrentRouteName } from '../../reducers/route';
import AppLayout from '../../components/AppLayout';
import UserModel from '../../models/User';


const mapStateToProps = state => ({
  location: getLocation(state),
  currentRoute: getCurrentRoute(state),
  currentRouteName: getCurrentRouteName(state),
  loggedUser: UserModel.createGuest(),
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
