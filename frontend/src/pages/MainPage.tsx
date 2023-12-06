import React from 'react';
import { Layout } from 'antd';

import { ProjectProvider, BoardProvider } from '../contexts';
import { Header, Sider, Content } from '../components';

export const MainPage: React.FC = () => {
  return (
    <ProjectProvider>
      <BoardProvider>
        <Layout>
          <Header />
          <Layout hasSider style={{ height: 'var(--content-height)' }}>
            <Sider />
            <Content />
          </Layout>
        </Layout>
      </BoardProvider>
    </ProjectProvider>
  );
};
