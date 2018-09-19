import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {getAllUsers, changeAllUserDepartment, setAllActivated} from "../../../actions/users";
import {getDepartmentsList} from "../../../actions/departments";
import {getLoggedUser} from "../../../reducers/loggedUser";
import {getAllUsersList, isUsersLoading} from "../../../reducers/users";
import {getDepartments, isLoadingDepartments} from "../../../reducers/departments";
import AllCompanies from '../../../components/UsersList/AllCompanies';

import '../../../components/UsersList/MyCompany/style.less';

const mapStateToProps = state => ({
    loggedUser: getLoggedUser(state),
    dataSource: getAllUsersList(state),
    loading: isUsersLoading(state),
    getDepartments: companyId => getDepartments(state, companyId),
    isLoadingDepartments: companyId => isLoadingDepartments(state, companyId)
});

const mapDispatchToProps = {
    getUsers: getAllUsers,
    setActivated: setAllActivated,
    changeUserDepartment: changeAllUserDepartment,
    getDepartmentsList
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllCompanies));