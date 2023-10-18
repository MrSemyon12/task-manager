import React from 'react';
import { Layout, theme } from 'antd';

const { Content: AntdContent } = Layout;

export const Content: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntdContent
      style={{
        padding: 24,
        margin: 0,
        height: 500,
        background: colorBgContainer,
      }}
    >
      Content
    </AntdContent>
  );
};
