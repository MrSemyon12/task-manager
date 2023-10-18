import React from 'react';

import { Layout } from 'antd';

import { Header } from '../components/Header';
import { Sider } from '../components/Sider';
import { Content } from '../components/Content';

export const Main: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Layout hasSider>
        <Sider />
        <Layout style={{ padding: '24px 24px' }}>
          <Content />
        </Layout>
      </Layout>
    </Layout>
  );
};
