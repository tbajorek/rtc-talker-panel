import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const MenuItem = ({ route, text, icon, action, ...props }) => (
    <Link to={route.path}>
        <Menu.Item {...props}>
            { icon ? <Icon type={icon} /> : null }
            <span style={{color: 'rgba(255, 255, 255, 0.65)'}}>
                {text}
            </span>
        </Menu.Item>
    </Link>
);

MenuItem.propTypes = {
  route: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

export default MenuItem;
