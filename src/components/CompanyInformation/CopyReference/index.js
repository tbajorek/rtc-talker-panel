import React from 'react';
import Clipboard from 'react-clipboard.js';
import { Input, Icon } from 'antd';
import { routesData, Roles } from '../../../routes';
import Messages from '../../../utils/Messages';

const CopyReference = ({user}) => {
    if(user.role < Roles.MANAGER) {
        return null;
    }
    const regex = /^(https?:\/\/[a-z.:0-9]*)/g;
    const foundUrl = location.href.match(regex);
    const fullUrl = foundUrl + routesData['sign-up'].path + '?companyId=' + user.company.id;
    return (
        <div>
            <h3>Zaproszenie nowego pracownika</h3>
            <Input addonAfter={
                <Clipboard component="button" data-clipboard-text={fullUrl} onSuccess={
                    () => Messages.success('Skopiowano', 'Link został skopiowany do schowka')
                }>
                    <Icon type="setting" />
                </Clipboard>
            } defaultValue={fullUrl} />
        </div>
    );
};

export default CopyReference;