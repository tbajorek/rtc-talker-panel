import React from 'react';
import UniversalTable from "../../../components/UniversalTable";
import {Roles} from "../../../roles";

import './style.less';
import MyCompany from '../MyCompany';

class AllCompanies extends MyCompany {
    _prepareColumns() {
        const columns = super._prepareColumns();
        columns.splice(2, 0, {
            title: 'Firma',
            key: 'company',
            role: Roles.ADMIN,
            searching: true,
            onFilter: (value, user) => user.company ? ('' + user.company.name).toLowerCase().includes(('' + value).toLowerCase()) : '',
            render: (company, user) => !!company ? company.name : ''
        });
        return columns;
    }
    componentDidMount() {
        const {loggedUser} = this.props;
        this.columns = this._prepareColumns();
        this.props.getUsers(loggedUser.token);
    }

    render() {
        return this.columns ? <UniversalTable {...this.props} columns={this.columns}/> : null;
    }
}

export default AllCompanies;