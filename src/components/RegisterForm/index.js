import React from 'react';
import ui from 'redux-ui';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {PasswordMeter} from 'password-meter';
import PasswordIndicator from '../PasswordIndicator';
import './style.less';

const FormItem = Form.Item;

@ui({
    key: 'registerForm',
    state: {
        name: '',
        surname: '',
        email: '',
        password: '',
        password2: '',
        company: '',
        hasCompany: false,
        passwordStatus: {
            percent: 1,
            status: 'brak',
            errors: []
        }
    }
})
class RegisterForm extends React.Component {
    componentWillMount() {
        this.props.updateUI({
            hasCompany: typeof this.props.companyId !== 'undefined',
            company: this.props.companyId
        });
    }
    onFormSent(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.signUp(values);
            }
        });
    }
    onHasCompanyChange() {
        this.props.updateUI('hasCompany', !this.props.ui.hasCompany);
    }
    onUpdatePassword(e) {
        const password = e.target.value;
        const passwordStatus = (new PasswordMeter({
            /*minLength: { value: 8, message: "Minimalna długość hasła wynosi 8 znaków" },
            maxLength: { value: 15, message: "Maksymalna długość hasła wynosi 15 znaków" },
            uppercaseLettersMinLength: { value: 1, message: "Podaj co najmniej jedną dużą literę" },
            lowercaseLettersMinLength: { value: 2, message: "Podaj co najmniej dwie małe litery" },
            numbersMinLength: { value: 1, message: "Podaj co najmniej jedną cyfrę" },
            symbolsMinLength: { value: 1, message: "Podaj co najmniej jeden znak specjalny" },*/
        }, {
            "40": "bardzo słabe",  // 001 <= x <  040
            "80": "słabe",  // 040 <= x <  080
            "120": "przeciętne", // 080 <= x <  120
            "180": "silne", // 120 <= x <  180
            "200": "bardzo silne", // 180 <= x <  200
            "_": "idealne"   //        x >= 200
        })).getResult(password);
        if(typeof passwordStatus.errors === "undefined") {
            passwordStatus.errors = [];
        }
        if(passwordStatus.status === "Empty") {
            passwordStatus.status = "brak";
        }
        passwordStatus.percent = Math.max(1, passwordStatus.percent);
        this.props.updateUI({
            password,
            passwordStatus
        });
    }
    render() {
        const { form, ui, updateUI } = this.props;
        return (
            <Form className="register-form">
                <FormItem>
                    {form.getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Proszę podać swoje imię' }],
                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Imię" onChange={(e) => updateUI('name', e.target.value)}/>)}
                </FormItem>
                <FormItem>
                    {form.getFieldDecorator('surname', {
                        rules: [{ required: true, message: 'Proszę podać swoje nazwisko' }],
                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Nazwisko" onChange={(e) => updateUI('surname', e.target.value)}/>)}
                </FormItem>
                <FormItem>
                    {form.getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Proszę podać adres e-mail' }],
                    })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Adres e-mail" onChange={(e) => updateUI('email', e.target.value)}/>)}
                </FormItem>
                <FormItem>
                    {form.getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Proszę podać hasło' }],
                    })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Hasło" onChange={this.onUpdatePassword.bind(this)} />)}
                    <PasswordIndicator percent={ui.passwordStatus.percent} errors={ui.passwordStatus.errors} status={ui.passwordStatus.status}/>
                </FormItem>
                <FormItem>
                    {form.getFieldDecorator('password2', {
                        rules: [{ required: true, message: 'Proszę powtórzyć hasło' }],
                    })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Powtórz hasło" onChange={(e) => updateUI('password2', e.target.value)} />)}
                </FormItem>
                <FormItem>
                    <Checkbox value={ui.hasCompany} checked={ui.hasCompany} onChange={this.onHasCompanyChange.bind(this)}>Dołączenie do firmy</Checkbox>
                    {ui.hasCompany ? form.getFieldDecorator('company', {
                        rules: [{ required: true, message: 'Proszę podać identyfikator firmy' }],
                        initialValue: ui.company,
                    })(<Input prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Identyfikator firmy" onChange={(e) => updateUI('company', e.target.value)} />) : null}
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.onFormSent.bind(this)} className="login-button" loading={this.props.registerLoading}>
                        Zarejestruj się
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(RegisterForm);
