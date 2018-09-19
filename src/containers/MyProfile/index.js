import { connect } from 'react-redux';
import * as profileActions from '../../actions/profile';
import * as companyActions from '../../actions/company';

import Profile from "../../components/Profile";
import {getLoggedUser} from "../../reducers/loggedUser";
import {getCompany} from "../../reducers/companies";
import {withRouter} from "react-router";

const mapStateToProps = state => ({
    user: getLoggedUser(state),
    currentUser: getLoggedUser(state),
    company: getCompany(getLoggedUser(state).company.id, state)
});

const mapDispatchToProps = {
  saveUserAddress: profileActions.saveMyAddress,
  saveCompanyAddress: profileActions.saveMyCompanyAddress,
  loadCompany: companyActions.loadCompany,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));