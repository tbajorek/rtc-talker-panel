import React from 'react';
import { Tabs } from 'antd';
import UserInformation from "./UserInformation";
import CompanyInformation from "../CompanyInformation";
import './style.less';

const TabPane = Tabs.TabPane;

const Profile = ({user, currentUser, saveUserAddress, saveCompanyAddress, company, loadCompany}) => (
    <div className="user-profile">
        <Tabs defaultActiveKey="1">
            <TabPane tab="Użytkownik" key="1">
                <UserInformation user={user} currentUser={currentUser} onSaveAddress={saveUserAddress}/>
            </TabPane>
            <TabPane tab="Firma" key="2">
                <CompanyInformation company={company} user={user} currentUser={currentUser} loadCompany={(companyId) => loadCompany(currentUser.token, companyId)} onSaveAddress={saveCompanyAddress}/>
            </TabPane>
        </Tabs>
    </div>

);

export default Profile;