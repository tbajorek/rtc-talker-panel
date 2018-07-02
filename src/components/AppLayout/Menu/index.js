import React from 'react';
import PropTypes from 'prop-types';
import { Menu as AntdMenu } from 'antd';

import MenuItem from './MenuItem';

const Menu = ({
  routeName, loggedUser, ...props
}) => (
  <AntdMenu
    {...props}
    theme="dark"
    mode="inline"
    className="menu"
    selectedKeys={[routeName]}
  >
    <MenuItem key="sign-in" name="sign-in" text="Zaloguj" loggedUser={loggedUser} />
    <MenuItem key="sign-up" name="sign-up" text="Zarejestruj" loggedUser={loggedUser} />
  </AntdMenu>
);

Menu.propTypes = {
  routeName: PropTypes.string.isRequired,
  loggedUser: PropTypes.object.isRequired,
};

export default Menu;
