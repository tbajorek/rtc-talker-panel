import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import './style.less';

const MessageMenu = ({startSelectingFiles}) => {
  const list = (
    <Menu onClick={startSelectingFiles}>
      <Menu.Item key="file">
        Wyślij plik
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown placement="topLeft" overlay={list} trigger={['click']}>
      <Button className="chat-options-button" icon="up" />
    </Dropdown>
  );
};

export default MessageMenu;
