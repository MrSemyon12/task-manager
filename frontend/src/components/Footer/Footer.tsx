import React from 'react';

import { Layout } from 'antd';

const { Footer: AntdFooter } = Layout;

export const Footer: React.FC = () => {
  return (
    <AntdFooter
      style={{
        height: 'var(--footer-height)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'burlywood',
      }}
    >
      footer
    </AntdFooter>
  );
};
