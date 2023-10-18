import React from 'react';
import { Layout } from 'antd';

const { Header: AntdHeader } = Layout;

export const Header: React.FC = () => {
  return (
    <AntdHeader style={{ display: 'flex', alignItems: 'center' }}>
      <h1 style={{ color: 'white' }}>Task Manager</h1>
    </AntdHeader>
  );
};
