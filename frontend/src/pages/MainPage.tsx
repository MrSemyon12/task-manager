import React from 'react';
import { Layout } from 'antd';

import { ProjectProvider } from '../contexts/ProjectContext';
import { Header } from '../components/Header';
import { Sider } from '../components/Sider';
import { Content } from '../components/Content';
import { Footer } from '../components/Footer';

export const MainPage: React.FC = () => {
  return (
    <ProjectProvider>
      <Layout>
        <Header />
        <Layout hasSider style={{ height: 'var(--content-height)' }}>
          <Sider />
          <Content />
        </Layout>
        <Footer />
      </Layout>
    </ProjectProvider>
  );
};
