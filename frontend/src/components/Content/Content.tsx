import React from 'react';

import { Layout, Flex, Card } from 'antd';

const { Content: AntdContent } = Layout;

const cards = [...Array(4)].map((_) => (
  <Card style={{ width: '100%', margin: 10, height: 'calc(100vh - 160px)' }}>
    Card
  </Card>
));

export const Content: React.FC = () => {
  return (
    <AntdContent
      style={{
        overflow: 'auto',
        height: 'calc(100vh - 108px)',
        // backgroundColor: '#f5f5f5',
        padding: 10,
        backgroundColor: 'coral',
      }}
    >
      <Flex justify='space-between'>{cards}</Flex>
    </AntdContent>
  );
};
