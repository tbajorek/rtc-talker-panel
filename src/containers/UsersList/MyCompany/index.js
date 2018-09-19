import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {getUsersForMyCompany, changeMyUserDepartment, setMyActivated} from "../../../actions/users";
import {getDepartmentsList} from "../../../actions/departments";
import {getLoggedUser} from "../../../reducers/loggedUser";
import {getMyUsersList, isUsersLoading} from "../../../reducers/users";
import {getDepartments, isLoadingDepartments} from "../../../reducers/departments";
import MyCompany from '../../../components/UsersList/MyCompany';

import '../../../components/UsersList/MyCompany/style.less';

const mapStateToProps = state => ({
    loggedUser: getLoggedUser(state),
    dataSource: getMyUsersList(state),
    loading: isUsersLoading(state),
    getDepartments: companyId => getDepartments(state, companyId),
    isLoadingDepartments: companyId => isLoadingDepartments(state, companyId)
});

const mapDispatchToProps = {
    getUsers: getUsersForMyCompany,
    setActivated: setMyActivated,
    changeUserDepartment: changeMyUserDepartment,
    getDepartmentsList
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyCompany));