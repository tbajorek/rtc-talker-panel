import React from 'react';
import {Tag, Switch} from 'antd';
import UniversalTable from "../../components/UniversalTable";
import {Roles} from "../../routes";

import './style.less';
import userChecker from "../../utils/userChecker";


class CompaniesList extends React.Component {
    _prepareColumns() {
        const {loggedUser, setActivated} = this.props;
        console.log(setActivated);
        return [{
            title: 'Nazwa',
            key: 'name',
            role: Roles.ADMIN,
            searching: true,
            sorter: (a, b) => a.name.localeCompare(b.name),
        }, {
            title: 'Status',
            key: 'activated',
            role: Roles.MANAGER,
            filters: true,
            render: (activated, company) => <Switch disabled={!userChecker(loggedUser, {role: Roles.ADMIN})}
                                                 defaultChecked={Boolean(activated)}
                                                 onChange={() => setActivated(company.id, !activated, loggedUser.token)}/>,
        }, {
            title: 'Użytkownicy',
            key: 'workers',
            role: Roles.ADMIN,
            render: (users, company) => users.map(user => <Tag key={user.id}>{`${user.name} ${user.surname}`}</Tag>)
        }, {
            title: 'Departamenty',
            key: 'departments',
            role: Roles.ADMIN,
            render: (departments, company) => departments.map(department => <Tag key={department.id}>{department.name}</Tag>)
        }];
    }

    componentDidMount() {
        const {loggedUser} = this.props;
        this.columns = this._prepareColumns();
        this.props.getAllCompanies(loggedUser.token);
    }

    render() {
        return this.columns ?
            <React.Fragment>
                <UniversalTable {...this.props} columns={this.columns}/></React.Fragment> : null;
    }
}

export default CompaniesList;