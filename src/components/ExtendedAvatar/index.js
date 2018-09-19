import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

const getUserLetters = user => user.name.charAt(0).toUpperCase()+user.surname.charAt(0).toUpperCase();

const ExtendedAvatar = ({user, className, size}) => (
    <Avatar size={size} className={className} src={user.avatar}>{!user.avatar ? getUserLetters(user) : null}</Avatar>
);

ExtendedAvatar.propTypes = {
    user: PropTypes.shape({
        avatar: PropTypes.string,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
    }).isRequired,
    className: PropTypes.string,
};


export default ExtendedAvatar;