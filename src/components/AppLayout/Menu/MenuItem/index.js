import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import userChecker from '../../../../utils/userChecker';
import { routesData } from '../../../../routes';

const MenuItem = ({ name, text, loggedUser, ...props }) => (
  userChecker(loggedUser, routesData[name]) ?
    <Menu.Item {...props}>
      <Link to={routesData[name].path}>{text}</Link>
    </Menu.Item>
    : null
);

MenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  loggedUser: PropTypes.object.isRequired,
};

export default MenuItem;
