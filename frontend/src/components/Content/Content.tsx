import React from 'react';

import { Layout } from 'antd';

const { Content: AntdContent } = Layout;

export const Content: React.FC = () => {
  return (
    <AntdContent
      style={{
        overflow: 'auto',
        height: 'calc(100vh - 125px)',
        // backgroundColor: '#f5f5f5',
        padding: 10,
        backgroundColor: 'coral',
      }}
    >
      Content
    </AntdContent>
  );
};
