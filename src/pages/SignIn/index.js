import React from 'react';
import LoginForm from '../../containers/LoginForm';

const SignIn = ({}) => (
  <div className="centered-page">
    <h1>Panel logowania</h1>
    <LoginForm />
  </div>
);

SignIn.title = 'Logowanie';

export default SignIn;
