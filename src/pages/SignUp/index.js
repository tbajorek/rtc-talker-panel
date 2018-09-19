import React from 'react';
import queryString from 'query-string';
import RegisterForm from "../../containers/RegisterForm";

const SignUp = ({location}) => {
    const parsed = queryString.parse(location.search);
    return <div className="centered-page">
        <h1>Rejestracja</h1>
        <RegisterForm companyId={parsed.companyId} />
    </div>;
};

SignUp.title = 'Rejestracja';

export default SignUp;
