import React from 'react';

import { Layout } from 'antd';

const { Content: AntdContent } = Layout;

export const Content: React.FC = () => {
  return (
    <AntdContent
      style={{
        padding: 24,
      }}
    >
      Content
    </AntdContent>
  );
};
