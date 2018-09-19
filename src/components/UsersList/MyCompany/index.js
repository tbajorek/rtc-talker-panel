import React from 'react';
import {Switch} from 'antd';
import UniversalTable from "../../../components/UniversalTable";
import {Roles} from "../../../routes";
import userChecker from "../../../utils/userChecker";

import './style.less';
import TagsList from "../../../components/UniversalTable/TagsList";

class MyCompany extends React.Component {
    _prepareColumns() {
        const {loggedUser} = this.props;
        return [{
            title: 'Imię i nazwisko',
            key: 'fullName',
            role: Roles.MANAGER,
            searching: true,
        }, {
            title: 'Email',
            key: 'email',
            role: Roles.MANAGER,
            searching: true,
            sorter: (a, b) => a.localeCompare(b),
        }, {
            title: 'Status',
            key: 'activated',
            role: Roles.MANAGER,
            filters: true,
            render: (activated, user) => <Switch disabled={!userChecker(loggedUser, {role: Roles.MANAGER})}
                                                 defaultChecked={Boolean(activated)}
                                                 onChange={() => this.props.setActivated(user.id, !activated, loggedUser.token)}/>,
        }, {
            title: 'Departamenty',
            key: 'departments',
            role: Roles.MANAGER,
            render: (departments, user) => <TagsList data={departments} elemId={user.id}
                                                     closable={userChecker(loggedUser, {role: Roles.MANAGER})}
                                                     newTagOptions={user.company ? this.props.getDepartments(user.company.id) : []}
                                                     loading={user.company ? this.props.isLoadingDepartments(user.company.id) : false}
                                                     addElement={(userId, departmentId) => this.props.changeUserDepartment(userId, [...departments.map(department => department.id), departmentId], loggedUser.token)}
                                                     removeElement={(userId, departmentId) => this.props.changeUserDepartment(userId, departments.map(department => department.id).filter(found => found !== departmentId), loggedUser.token)}
                                                     loadData={() => this.props.getDepartmentsList(user.company.id, loggedUser.token)}
                                                     excludedOptions={departments}
                                                     addible={user.company !== null && userChecker(loggedUser, {role: Roles.MANAGER})}/>,
        }];
    }

    componentDidMount() {
        const {loggedUser} = this.props;
        this.columns = this._prepareColumns();
        this.props.getUsers(loggedUser.company.id, loggedUser.token);
    }

    render() {
        return this.columns ? <UniversalTable {...this.props} columns={this.columns}/> : null;
    }
}

export default MyCompany;