import React from 'react';
import {Popconfirm, Button} from 'antd';
import UniversalTable from "../../../components/UniversalTable";
import {Roles} from "../../../routes";

import './style.less';
import NewDepartmentModal from "../NewDepartmentModal";
import UsersOfDepartments from "../../UsersList/UsersOfDepartments";
import userChecker from "../../../utils/userChecker";

class MyCompany extends React.Component {
    _prepareColumns() {
        const {loggedUser, getUsersList, removeDepartment} = this.props;
        return [{
            title: 'Nazwa',
            key: 'name',
            role: Roles.MANAGER,
            searching: true,
            sorter: (a, b) => a.name.localeCompare(b.name),
        }, {
            title: 'Użytkownicy',
            key: 'workers',
            role: Roles.MANAGER,
            render: (users, department) => <UsersOfDepartments loggedUser={loggedUser} companyId={department.companyId} getUsersList={getUsersList} userIds={users} companyUsers={this.props.users}/>
        }, {
            title: 'Operacje',
            key: 'action',
            role: Roles.MANAGER,
            render: (nothing, department) => <Popconfirm title={`Czy chcesz usunąć departament ${department.name}`} onConfirm={() => removeDepartment(department.companyId, department.id, loggedUser.token)} okText="Tak" cancelText="Nie">
                <Button type="danger" icon="close">Usuń</Button>
            </Popconfirm>
        }];
    }

    componentDidMount() {
        const {loggedUser} = this.props;
        this.columns = this._prepareColumns();
        this.props.getDepartments(loggedUser.company.id, loggedUser.token);
    }

    render() {
        const {loggedUser, modalVisible, modalLoading, users, allCompanies, getUsersList, setModalVisibility, addDepartment} = this.props;
        return this.columns ?
            <React.Fragment>
                {userChecker(loggedUser, {role: Roles.MANAGER}) ? <NewDepartmentModal loggedUser={loggedUser} companySelectable={false} visible={modalVisible}
                                    loading={modalLoading} allCompanies={allCompanies}
                                    addDepartment={addDepartment} getUsersList={getUsersList}
                                    setModalVisibility={setModalVisibility} companyUsers={users}
                                    getAllCompanies={() => null} company={loggedUser.company}/> : null }
                <UniversalTable {...this.props} columns={this.columns}/></React.Fragment> : null;
    }
}

export default MyCompany;