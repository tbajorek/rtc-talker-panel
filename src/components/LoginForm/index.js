import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './style.less';

const FormItem = Form.Item;

const LoginForm = ({ form, signIn }) => (
  <Form
    onSubmit={(e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                signIn(values);
            }
        });
    }}
    className="login-form"
  >
    <FormItem>
      {form.getFieldDecorator('email', {
                rules: [{ required: true, message: 'Proszę podać adres e-mail' }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Adres e-mail" />)}
    </FormItem>
    <FormItem>
      {form.getFieldDecorator('password', {
                rules: [{ required: true, message: 'Proszę podać hasło' }],
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Hasło" />)}
    </FormItem>
    <FormItem>
      {form.getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
            })(<Checkbox>Zapamiętaj mnie</Checkbox>)}
      <Button type="primary" htmlType="submit" className="login-form-button">
                Zaloguj się
      </Button>
    </FormItem>
  </Form>
);

export default Form.create()(LoginForm);
