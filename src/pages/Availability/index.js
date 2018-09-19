import React from 'react';
import MyAvailability from '../../containers/Availability';

const Availability = ({}) => (
  <div className="normal-page">
    <h1>Twoja dostępność</h1>
    <MyAvailability/>
  </div>
);

Availability.title = 'Dostępność';

export default Availability;
