import React, {Component} from 'react';
import {Select, Input, Form, Icon} from 'antd';
import userChecker from "../../../../utils/userChecker";
import {Roles} from "../../../../routes";

const Option = Select.Option;

class CompanySelect extends Component {
    componentDidMount() {
        if(!this.props.allCompanies && this.props.selectable && userChecker(this.props.loggedUser, {role: Roles.ADMIN})) {
            this.props.getAllCompanies();
        }
    }
    render() {
        const {loggedUser, selectable, allCompanies, selectedCompany, updateCompany} = this.props;
        if(userChecker(loggedUser, {role: Roles.ADMIN}) && selectable) {
            return (allCompanies ?
                    <Select defaultValue={selectedCompany} style={{ width: 120 }} onChange={(companyId) => updateCompany(allCompanies.filter(company => company.id === companyId))}>
                        {allCompanies.map(company => <Option key={company.id} value={company.id}>{company.name}</Option>)}
                    </Select> : null
            );
        } else {
            return <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} value={selectedCompany.name} disabled={true} />;
        }
    }
}

export default CompanySelect;