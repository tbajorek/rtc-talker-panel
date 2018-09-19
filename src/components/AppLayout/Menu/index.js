import React from 'react';
import PropTypes from 'prop-types';
import { Menu as AntdMenu } from 'antd';

import { routesData } from '../../../routes';
import userChecker from '../../../utils/userChecker';
import MenuItem from './MenuItem';

const Menu = ({
  routeName, loggedUser, ...props
}) => {
    const menuItems = [];
    Object.entries(routesData).forEach(([name, route]) => {
        if(userChecker(loggedUser, route) && typeof route.menu !== 'undefined') {
          menuItems.push(<MenuItem key={name} route={route} text={route.menu.title} icon={route.menu.icon} action={route.action ? route.action : null}/>)
        }
    });

  return (
      <AntdMenu
          {...props}
          theme="dark"
          mode="inline"
          className="menu"
          selectedKeys={[routeName]}
      >
          {menuItems}
      </AntdMenu>
  );
};

Menu.propTypes = {
  routeName: PropTypes.string,
  loggedUser: PropTypes.object.isRequired,
};

export default Menu;
