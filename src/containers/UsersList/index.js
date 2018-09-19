import {connect} from 'react-redux';

import {withRouter} from "react-router";
import UsersList from "../../components/UsersList";

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersList));