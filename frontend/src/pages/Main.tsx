import React from 'react';

import { Layout } from 'antd';

import { Header } from '../components/Header';
import { Sider } from '../components/Sider';
import { Content } from '../components/Content';
import { Footer } from '../components/Footer';

export const Main: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Layout hasSider>
        <Sider />
        <Content />
      </Layout>
      <Footer />
    </Layout>
  );
};
