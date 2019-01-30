import React from 'react';
import MyCompanyContainer from '../../containers/UsersList/MyCompany';
import AllCompaniesContainer from '../../containers/UsersList/AllCompanies';
import DualTabs from "../../containers/DualTabs";
import {Roles} from "../../roles";

const UsersList = ({}) => (
  <div className="normal-page">
    <h1>Użytkownicy</h1>
    <DualTabs
        tab1={{
            title: 'Własna firma',
            content: <MyCompanyContainer />,
            roles: [Roles.USER, Roles.MANAGER, Roles.ADMIN]
        }}
        tab2={{
            title: 'Wszyscy',
            content: <AllCompaniesContainer />,
            role: Roles.ADMIN
        }}
    />
  </div>
);

UsersList.title = 'Użytkownicy';

export default UsersList;
