import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {getUsersForCompany, changeMyUserDepartment, setMyActivated} from "../../../actions/users";
import {getDepartmentsList, setNewDepModalVisibility, addDepartment, removeDepartment} from "../../../actions/departments";
import {getLoggedUser} from "../../../reducers/loggedUser";
import {getDepartments, isLoadingDepartments, isModalLoading, isModalVisible} from "../../../reducers/departments";
import MyCompany from '../../../components/DepartmentsList/MyCompany';

import '../../../components/DepartmentsList/MyCompany/style.less';
import {getUsersByCompany} from "../../../reducers/users";

const mapStateToProps = state => ({
    loggedUser: getLoggedUser(state),
    dataSource: getDepartments(state, getLoggedUser(state).company.id),
    loading: isLoadingDepartments(state, getLoggedUser(state).company.id),
    modalVisible: isModalVisible(state),
    modalLoading: isModalLoading(state),
    users: getUsersByCompany(state, getLoggedUser(state).company.id)
});

const mapDispatchToProps = {
    getDepartments: getDepartmentsList,
    setModalVisibility: setNewDepModalVisibility,
    addDepartment,
    getUsersList: getUsersForCompany,
    removeDepartment
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyCompany));