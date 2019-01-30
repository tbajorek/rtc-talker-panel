import React from 'react';
import {Row, Table} from 'antd';
import './style.less';
import AddressInformation from "../../AddressInformation";
import ExtendedAvatar from '../../ExtendedAvatar';
import {Roles} from '../../../roles';

const columns = [{
    dataIndex: 'name',
    key: 'name',
    render: text => <b>{text}</b>,
}, {
    dataIndex: 'value',
    key: 'value'
}];


class UserInformation extends React.Component {
    static singleRowData(data, name, value) {
        return {
            key: data.length+1,
            name,
            value
        };
    }
    static getRoleTitle(role) {
        switch (role) {
            case Roles.GUEST:
                return 'Gość';
            case Roles.USER:
                return 'Użytkownik';
            case Roles.MANAGER:
                return 'Manager';
            case Roles.ADMIN:
                return 'Administrator';
        }
        return null;
    }
    static getDataFromUser(user) {
        const data = [];
        data.push(UserInformation.singleRowData(data, 'Imię', user.name));
        data.push(UserInformation.singleRowData(data, 'Nazwisko', user.surname));
        data.push(UserInformation.singleRowData(data, 'E-mail', user.email));
        data.push(UserInformation.singleRowData(data, 'Rola', UserInformation.getRoleTitle(user.role)));
        return data;
    }
    static canDisplay(user, currentUser) {
        return user.id === currentUser.id
            || currentUser.role >= Roles.MANAGER && !!user.company && !!currentUser.company && user.company.id === currentUser.company.id
            || currentUser.role >= Roles.ADMIN;
    }
    static canEdit(user, currentUser) {
        return user.id === currentUser.id
            || currentUser.role >= Roles.ADMIN;
    }
    render() {
        const {user, currentUser, onSaveAddress} = this.props;
        return (
            <React.Fragment>
                <Row className="avatar-container"><ExtendedAvatar user={user} /></Row>
                <Row className="user-information"><Table columns={columns} dataSource={UserInformation.getDataFromUser(user)} showHeader={false} pagination={false} /></Row>
                <Row><AddressInformation token={currentUser.token} address={user.address} canDisplay={UserInformation.canDisplay(user, currentUser)} canEdit={UserInformation.canEdit(user, currentUser)} onSave={onSaveAddress}/></Row>
            </React.Fragment>
        );
    }
}

export default UserInformation;