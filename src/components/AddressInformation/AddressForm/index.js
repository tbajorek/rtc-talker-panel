import React from 'react';
import ui from "redux-ui";
import { Form, Row, Col, Icon, Input, Button, Checkbox } from 'antd';
import './style.less';

const FormItem = Form.Item;

@ui({
    key: 'addressForm',
    state: {
        street: '',
        buildingNumber: '',
        postCode: '',
        city: '',
        country: '',
        phone: ''
    }
})
class AddressForm extends React.Component {
    componentWillMount() {
        const receivedAddress = this.props.address;
        if(typeof receivedAddress !== 'undefined') {
            this.props.updateUI('street', receivedAddress.street);
            this.props.updateUI('buildingNumber', receivedAddress.buildingNumber);
            this.props.updateUI('postCode', receivedAddress.postCode);
            this.props.updateUI('city', receivedAddress.city);
            this.props.updateUI('country', receivedAddress.country);
            this.props.updateUI('phone', receivedAddress.phone);
        }
    }
    render() {
        const address = this.props.ui;
        const {onSave, onCancel} = this.props;
        return (
            <Form className="address-edit-form">
                <Row>
                    <Col span={20}>
                        <FormItem>
                            <Input value={address.street} placeholder="Ulica" onChange={(e) => this.props.updateUI('street', e.target.value)} />
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <FormItem>
                            <Input value={address.buildingNumber} placeholder="Nr" onChange={(e) => this.props.updateUI('buildingNumber', e.target.value)} />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={7}>
                        <FormItem>
                            <Input value={address.postCode} placeholder="Kod pocztowy" onChange={(e) => this.props.updateUI('postCode', e.target.value)} />
                        </FormItem>
                    </Col>
                    <Col span={17}>
                        <FormItem>
                            <Input value={address.city} placeholder="Miejscowość" onChange={(e) => this.props.updateUI('city', e.target.value)} />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem>
                            <Input value={address.country} placeholder="Państwo" onChange={(e) => this.props.updateUI('country', e.target.value)} />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem>
                            <Input value={address.phone} placeholder="Nr telefonu" onChange={(e) => this.props.updateUI('phone', e.target.value)} />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Button type="primary" onClick={()=>onSave(
                            this.props.ui.street,
                            this.props.ui.buildingNumber,
                            this.props.ui.postCode,
                            this.props.ui.city,
                            this.props.ui.country,
                            this.props.ui.phone
                        )}>Zapisz</Button>
                    </Col>
                    {onCancel ? <Col span={12}>
                        <Button type="default" onClick={onCancel}>Anuluj</Button>
                    </Col> : null}
                </Row>
            </Form>
        );
    }
}

export default AddressForm;