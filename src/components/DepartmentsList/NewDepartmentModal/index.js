import React, {Component} from 'react';
import ui from 'redux-ui';
import {Button, Modal, Form, Icon, Input, Select} from 'antd';
import CompanySelect from "./CompanySelect";
import './style.less';

const FormItem = Form.Item;
const Option = Select.Option;

@ui({
    key: 'newDepartmentModal',
    state: {
        company: null,
        name: '',
        workers: []
    }
})
class NewDepartmentModal extends Component {
    componentDidMount() {
        let companyId = null;
        if(typeof this.props.company !== 'undefined') {
            this.props.updateUI('company', this.props.company);
            companyId = this.props.company.id;
        }
        if(!companyId && this.props.ui.company.id) {
            companyId = this.props.ui.company.id;
        }
        if(!this.props.companyUsers && companyId) {
            this.props.getUsersList(companyId, this.props.loggedUser.token);
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {loggedUser, companySelectable, visible, loading, allCompanies, companyUsers, setModalVisibility, addDepartment, getAllCompanies} = this.props;
        const {company, name, workers} = this.props.ui;
        return (
            <div>
                <Button className="add-new-department" type="primary" onClick={() => setModalVisibility(!visible, false)}>
                    Dodaj departament
                </Button>
                <Modal title="Dodawanie nowego departamentu"
                       visible={visible}
                       onOk={() => {setModalVisibility(true, true); addDepartment(company.id, name, workers, loggedUser.token);}}
                       confirmLoading={loading}
                       onCancel={() => setModalVisibility(false, false)}
                >
                    <CompanySelect selectable={companySelectable} loggedUser={loggedUser} allCompanies={allCompanies} getAllCompanies={getAllCompanies} selectedCompany={company} updateCompany={(value) => this.props.updateUI('company', value)}/>
                    <FormItem>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Proszę podać nazwę departamentu' }],
                        })(
                            <Input prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nazwa departamentu" onChange={e => this.props.updateUI('name', e.target.value)} />
                        )}
                    </FormItem>
                    <FormItem>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Wybierz użytkowników"
                            onChange={(selected) => this.props.updateUI('workers', selected)}
                        >
                            {!!companyUsers ? companyUsers.map(user => <Option key={user.id} value={user.id}>{user.fullName}</Option>) : null}
                        </Select>
                    </FormItem>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(NewDepartmentModal);