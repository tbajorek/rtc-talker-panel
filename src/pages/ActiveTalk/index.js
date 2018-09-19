import React from 'react';
import ActiveTalkContainer from '../../containers/ActiveTalk';

const ActiveTalk = ({}) => (
  <div className="normal-page">
    <h1>Aktualna rozmowa</h1>
    <ActiveTalkContainer />
  </div>
);

ActiveTalk.title = 'Aktualna rozmowa';

export default ActiveTalk;
