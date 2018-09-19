import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import CompaniesList from '../../components/CompaniesList';

import {getAllCompanies, isLoadingCompanies} from "../../reducers/companies";
import {getLoggedUser} from "../../reducers/loggedUser";
import {loadAllCompanies, setActivatedCompany} from "../../actions/company";

const mapStateToProps = state => ({
    loggedUser: getLoggedUser(state),
    dataSource: getAllCompanies(state),
    loading: isLoadingCompanies(state),
});

const mapDispatchToProps = {
    getAllCompanies: loadAllCompanies,
    setActivated: setActivatedCompany
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompaniesList));