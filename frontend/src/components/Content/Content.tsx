import React from 'react';

import { Layout, Card } from 'antd';

const { Content: AntdContent } = Layout;

export const Content: React.FC = () => {
  return (
    <AntdContent
      style={{
        overflow: 'auto',
        padding: 10,
        backgroundColor: 'coral',
      }}
    >
      <Card>Info</Card>
    </AntdContent>
  );
};
