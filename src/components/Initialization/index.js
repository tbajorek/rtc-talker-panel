import React from 'react';
import { Steps, Alert } from 'antd';

import './style.less';
import {Roles} from "../../routes";
import AddressForm from "../AddressInformation/AddressForm";
import userChecker from "../../utils/userChecker";
import CompanyStep from "./CompanyStep";

const Step = Steps.Step;

const Initialization = ({loggedUser, step, addMyAddress, addMyCompany}) => {
    const steps = [
        {
            title: 'Address',
            role: Roles.USER,
            content: <AddressForm onSave={(street, building_number, post_code, city, country, phone) => addMyAddress(loggedUser.token, street, building_number, post_code, city, country, phone)}/>,
            icon: 'home'
        },
        {
            title: 'Company',
            role: Roles.MANAGER,
            content: <CompanyStep loggedUser={loggedUser} addMyCompany={addMyCompany}/>,
            icon: 'bank',
        },
        {
            title: 'Finish',
            role: Roles.USER,
            content: <Alert
                message="Inicjalizacja zakończona"
                description="Wszystkie potrzebne informacje zostały ustawione. Możesz teraz w pełni korzystać z aplikacji."
                type="success"
                showIcon
            />,
            icon: 'check-cicrle',
        }
    ];
    return (
        <div className="initialization-component">
            <Steps current={step-1}>
                {steps.filter(singleStep => userChecker(loggedUser, singleStep)).map((singleStep, index) => <Step key={index} title={singleStep.title} />)}
            </Steps>
            <div className="steps-content">{steps[step-1].content}</div>
        </div>
    );
};

export default Initialization;
