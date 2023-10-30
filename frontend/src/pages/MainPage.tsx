import React from 'react';
import { Layout } from 'antd';

import { Header, Sider, Content, Footer } from '../components';

export const MainPage: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Layout hasSider style={{ height: 'var(--content-height)' }}>
        <Sider />
        <Content />
      </Layout>
      <Footer />
    </Layout>
  );
};
