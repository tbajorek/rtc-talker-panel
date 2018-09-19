import React from 'react';
import { Button, Spin } from 'antd';
import './style.less';
import AddressForm from "./AddressForm";
import AddressDisplay from "./AddressDisplay";
import ui from "redux-ui";
import {SAVE_USER_ADDRESS_SUCCESS, SAVE_COMPANY_ADDRESS_SUCCESS} from "../../actions/profile";

@ui({
    key: 'address',
    state: {
        edited: false,
        saving: false
    },
    reducer: (state, action) => {
        switch(action.type) {
            case SAVE_COMPANY_ADDRESS_SUCCESS:
            case SAVE_USER_ADDRESS_SUCCESS:
                return state.set('saving', false);
        }
        return state;
    }
})
class AddressInformation extends React.Component {
    render() {
        const {token, address, canDisplay, canEdit} = this.props;
        const onSave = (street, buildingNumber, postCode, city, country, phone) => {
            this.props.updateUI({edited: false, saving: true});
            this.props.onSave(token, street, buildingNumber, postCode, city, country, phone);
        };
        const {edited, saving} = this.props.ui;
        if(((typeof address === 'undefined' || address === null) && !canEdit) || !canDisplay) {
            return null;
        }
        const addressContent = saving ? <Spin /> : ((!address || edited) && canEdit ? <AddressForm address={address} onSave={onSave} onCancel={()=>this.props.updateUI('edited', false)}/> : <AddressDisplay address={address} canEdit={canEdit} />);
        return (
            <div className="addres-section">
                <h2>Adres:&nbsp;{!edited ? <Button onClick={() => this.props.updateUI('edited', true)} type="default" shape="circle" icon="edit" /> : null}</h2>
                {addressContent}
            </div>
        );
    }
}

export default AddressInformation;