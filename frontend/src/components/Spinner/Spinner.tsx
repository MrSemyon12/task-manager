import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const Spinner: React.FC = () => (
  <div style={styleBox}>
    <Spin indicator={antIcon} />
  </div>
);

const styleSpinner: React.CSSProperties = {
  fontSize: 64,
  color: 'var(--color-secondary)',
};

const antIcon = <LoadingOutlined style={styleSpinner} spin />;

const styleBox: React.CSSProperties = {
  marginTop: '100px',
  display: 'flex',
  justifyContent: 'center',
};
