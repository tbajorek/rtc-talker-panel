import React, {Component} from 'react';
import ui from 'redux-ui';
import AddressForm from "../../AddressInformation/AddressForm";
import {Col, Input, Row, Form} from "antd";
import './style.less';

const FormItem = Form.Item;

@ui({
    key: "companyStep",
    state: {
        name: '',
        nip: ''
    }
})
class CompanyStep extends Component {
    render() {
        const {loggedUser, addMyCompany} = this.props;
        const {name, nip} = this.props.ui;
        return (
            <div>
                <Row>
                    <Col span={18}>
                        <FormItem className="new-copmany-form-item">
                            <Input value={name} placeholder="Nazwa" onChange={(e) => this.props.updateUI('name', e.target.value)} />
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem className="new-copmany-form-item">
                            <Input value={nip} placeholder="NIP" onChange={(e) => this.props.updateUI('nip', e.target.value)} />
                        </FormItem>
                    </Col>
                </Row>
                <AddressForm onSave={(street, building_number, post_code, city, country, phone) => addMyCompany(loggedUser.token, name, nip, {street, building_number, post_code, city, country, phone})}/>
            </div>
        );
    }
}

export default CompanyStep;