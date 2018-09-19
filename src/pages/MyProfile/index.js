import React from 'react';
import MyProfileContainer from '../../containers/MyProfile';

const MyProfile = ({}) => (
  <div className="normal-page">
    <h1>Mój profil</h1>
    <MyProfileContainer />
  </div>
);

MyProfile.title = 'Mój profil';

export default MyProfile;
