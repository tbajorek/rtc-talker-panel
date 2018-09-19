import React from 'react';
import MyCompanyContainer from '../../containers/DepartmentsList/MyCompany';

const DepartmentsList = ({}) => (
  <div className="normal-page">
    <h1>Departamenty</h1>
      <MyCompanyContainer />
  </div>
);

DepartmentsList.title = 'Departamenty';

export default DepartmentsList;
