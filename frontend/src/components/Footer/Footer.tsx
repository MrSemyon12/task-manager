import React from 'react';
import { Layout } from 'antd';

const { Footer: AntdFooter } = Layout;

export const Footer: React.FC = () => {
  return <AntdFooter style={styleFooter}></AntdFooter>;
};

const styleFooter: React.CSSProperties = {
  height: 'var(--footer-height)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'var(--color-secondary)',
};
