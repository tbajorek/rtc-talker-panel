import React from 'react';
import CompaniesListContainer from '../../containers/CompaniesList';

const CompaniesList = ({}) => (
  <div className="normal-page">
    <h1>Firmy</h1>
      <CompaniesListContainer />
  </div>
);

CompaniesList.title = 'Firmy';

export default CompaniesList;
