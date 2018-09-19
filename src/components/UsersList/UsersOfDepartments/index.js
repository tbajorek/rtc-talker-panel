import React, {Component} from 'react';
import { Tag } from 'antd';

class UsersOfDepartments extends Component {
    componentDidMount() {
        this.props.getUsersList(this.props.companyId, this.props.loggedUser.token);
    }
    render() {
        const {userIds, companyUsers} = this.props;
        return Array.isArray(userIds) && companyUsers ? (
            <React.Fragment>
                {userIds.map(userId => {
                    const found = companyUsers.find(foundUser => foundUser.id === userId);
                    return !!found ? <Tag key={userId}>{found.fullName}</Tag> : null;
                })}
            </React.Fragment>
        ) : null;
    }
}

export default UsersOfDepartments;