import React from 'react';
import ui from 'redux-ui';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './style.less';

const FormItem = Form.Item;

@ui({
    key: 'loginForm',
    state: {
        email: '',
        password: '',
        remember: ''
    }
})
class LoginForm extends React.Component {
    onFormSent(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            const { email, password, remember } = values;
                this.props.signIn(email, password, remember);
            }
        });
    }
    onFormReset() {
        this.props.resetUI();
        this.props.form.setFieldsValue({
            email: ui.email,
            password: ui.password,
            remember: ui.remember
        });
    }
    render() {
        const { form, updateUI, loginLoading } = this.props;
        return (
            <Form className="login-form">
                <FormItem>
                    {form.getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Proszę podać adres e-mail' }],
                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Adres e-mail" onChange={(e) => updateUI('email', e.target.value)}/>)}
                </FormItem>
                <FormItem>
                    {form.getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Proszę podać hasło' }],
                    })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Hasło" onChange={(e) => updateUI('password', e.target.value)} onPressEnter={this.onFormSent.bind(this)}/>)}
                </FormItem>
                <FormItem>
                    {form.getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Zapamiętaj mnie</Checkbox>)}
                    <Button type="primary" onClick={this.onFormSent.bind(this)} loading={loginLoading} className="login-button">
                        Zaloguj się
                    </Button>
                    <Button type="default" className="reset-button" onClick={this.onFormReset.bind(this)}>
                        Anuluj
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(LoginForm);
