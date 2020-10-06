import React from 'react';
import { Dropdown, Avatar, Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './style.css';

function ThemeConfig() {
  const handleChangeTheme = ({ key }) => {
    localStorage.setItem('theme', key);
    window.location.reload();
  };
  const menu = (
    <Menu onClick={handleChangeTheme}>
      <Menu.Item key="default">Default</Menu.Item>
      <Menu.Item key="dark">Dark</Menu.Item>
      <Menu.Item key="blue">Blue</Menu.Item>
      <Menu.Item key="royal">Royal</Menu.Item>
      <Menu.Item key="asteroid">Asteroid</Menu.Item>
      <Menu.Item key="plum-plate">Plum Plate</Menu.Item>
      <Menu.Item key="night-sky">Night Sky</Menu.Item>
      <Menu.Item key="midnight-bloom">Midnight Bloom</Menu.Item>
      <Menu.Item key="sunny-morning">Sunny Morning</Menu.Item>
    </Menu>
  );
  return (
    <div className="fixed-widgets-setting">
      <Dropdown overlay={menu} placement="topRight">
        <Avatar size={44} icon={<SettingOutlined />} />
      </Dropdown>
    </div>
  );
}

export default ThemeConfig;
