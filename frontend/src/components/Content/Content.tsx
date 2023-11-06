import React from 'react';
import { Layout, Card, Flex } from 'antd';
import { useLocalStorage } from '../../hooks';

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
      <Card>Project Info</Card>
      <Flex>
        <Card>To Do</Card>
        <Card>Doing</Card>
        <Card>Done</Card>
      </Flex>
    </AntdContent>
  );
};
