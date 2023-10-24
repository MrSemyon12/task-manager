import React from 'react';

import { Button, Layout, Avatar, Popover } from 'antd';

const { Header: AntdHeader } = Layout;

export const Header: React.FC = () => {
  return (
    <AntdHeader
      style={{
        height: 'var(--header-height)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'purple',
        // boxShadow: 'inset -4px -4px 10px 2px #B0C4DE',
      }}
    >
      <h1 style={{ color: 'white' }}>Task Manager</h1>
      <Popover
        trigger='hover'
        content={
          <Button type='primary' danger>
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
          // src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
        >
          W
        </Avatar>
      </Popover>
    </AntdHeader>
  );
};
