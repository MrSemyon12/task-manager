import React from 'react';

import { Layout } from 'antd';

const { Footer: AntdFooter } = Layout;

export const Footer: React.FC = () => {
  return (
    <AntdFooter
      style={{
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'burlywood',
      }}
    >
      Footer
    </AntdFooter>
  );
};