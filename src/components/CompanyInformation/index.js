import React from "react";
import ui from "redux-ui";
import {Alert, Spin, Avatar, Row, Table, Icon} from 'antd';
import {SAVE_ADDRESS_SUCCESS} from "../../actions/profile";
import {isCompany} from "../../reducers/companies";
import AddressInformation from "../AddressInformation";
import CompanyForm from "./CompanyForm";
import {Roles} from "../../routes";
import {LOAD_COMPANY_SUCCESS} from "../../actions/company";
import CopyReference from "./CopyReference";

const columns = [{
    dataIndex: 'name',
    key: 'name',
    render: text => <b>{text}</b>,
}, {
    dataIndex: 'value',
    key: 'value'
}];

@ui({
    key: 'companyInformation',
    state: {
        loading: false
    },
    reducer: (state, action) => {
        switch(action.type) {
            case LOAD_COMPANY_SUCCESS:
                return state.set('loading', false);
        }
        return state;
    }
})
class CompanyInformation extends React.Component {
    componentDidMount() {
        if(!!this.props.user.company && !this.props.company.id) {
            this.props.updateUI('loading', true);
            this.props.loadCompany(this.props.user.company.id);
        }
    }
    static singleRowData(data, name, value) {
        return {
            key: data.length+1,
            name,
            value
        };
    }
    static getDataFromCompany(company) {
        const data = [];
        data.push(CompanyInformation.singleRowData(data, 'Nazwa', company.name));
        data.push(CompanyInformation.singleRowData(data, 'NIP', company.nip));
        const activatedIcon = company.activated ? 'check-circle' : 'close-circle';
        data.push(CompanyInformation.singleRowData(data, 'Aktywowana', <Icon type={activatedIcon} />));
        return data;
    }

    /**
     * Sprawdza alternatywne uprawnienia wyświetlania:
     * 1. firma użytkownika
     * 2. użytkownik zalogowany jest co najmniej managerem w firmie użytkownika profilu
     * 3. użytkownik zalogowany jest co najmniej administratorem systemu
     *
     * @param user
     * @param currentUser
     * @return {boolean}
     */
    static canDisplay(user, currentUser) {
        return user.id === currentUser.id
            || currentUser.role >= Roles.MANAGER && !!user.company && !!currentUser.company && user.company.id === currentUser.company.id
            || currentUser.role >= Roles.ADMIN;
    }
    static canEdit(user, currentUser) {
        return user.company === currentUser.company && currentUser.role >= Roles.MANAGER
            || currentUser.role >= Roles.ADMIN;
    }
    render() {
        const {company, user, currentUser, onSaveAddress} = this.props;
        if(this.props.ui.loading) {
            return <Row type="flex" justify="center" align="middle"><Spin /></Row>;
        } else if(!this.props.user.company && this.props.user.role >= Roles.MANAGER) {
            return <CompanyForm/>;
        }

        return (
            <React.Fragment>
                <Row className="user-information">
                    <Table columns={columns} dataSource={CompanyInformation.getDataFromCompany(company)} showHeader={false} pagination={false} />
                    {company.activated ? <CopyReference user={user} /> : null}
                </Row>
                <Row><AddressInformation token={currentUser.token} address={company.address} canDisplay={CompanyInformation.canDisplay(user, currentUser)} canEdit={CompanyInformation.canEdit(user, currentUser) && user.role >= Roles.MANAGER} onSave={onSaveAddress}/></Row>
            </React.Fragment>
        );
    }
}

export default CompanyInformation;