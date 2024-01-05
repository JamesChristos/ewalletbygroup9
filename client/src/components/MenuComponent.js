import React, { useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import Home from '../pages/Home';

const items = [
  {
    label: 'Dashboard',
    key: 'home',
    icon: <MailOutlined />,
  },
  {
    label: 'Expense',
    key: 'expense',
    icon: <MailOutlined />,
  },
  {
    label: 'Income',
    key: 'income',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
];

function MenuComponent() {
  const [current, setCurrent] = useState('mail');

  const handleMenuClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleMenuClick} selectedKeys={[current]} mode='horizontal'>
      {items.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} disabled={item.disabled}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default MenuComponent;
