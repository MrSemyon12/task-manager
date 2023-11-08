import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Layout, Avatar, Popover } from 'antd';

import { useLogout } from '../../hooks';

const { Header: AntdHeader } = Layout;

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <AntdHeader
      style={{
        height: 'var(--header-height)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'var(--color-secondary)',
      }}
    >
      <h1
        style={{
          color: 'var(--color-main)',
          marginLeft: '10px',
          textShadow: '5px 5px #558ABB',
        }}
      >
        Task Manager
      </h1>
      <Popover
        trigger='hover'
        content={
          <Button type='primary' danger onClick={handleLogout}>
            Logout
          </Button>
        }
      >
        <Avatar
          size={42}
          style={{
            backgroundColor: '#f56a00',
            cursor: 'pointer',
          }}
        >
          W
        </Avatar>
      </Popover>
    </AntdHeader>
  );
};
