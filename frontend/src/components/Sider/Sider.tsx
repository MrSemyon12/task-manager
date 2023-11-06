import React, { useEffect, useState } from 'react';
import { Layout, Space, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useApiPrivate, useProjects } from '../../hooks';
import { Card } from '../Card';

const { Sider: AntdSider } = Layout;
const PROJECTS_URL = '/projects/my';

export const Sider: React.FC = () => {
  const { projects, setProjects } = useProjects();
  const [isLoading, setIsLoading] = useState(false);
  const apiPrivate = useApiPrivate();

  useEffect(() => {
    setIsLoading(true);

    apiPrivate
      .get(PROJECTS_URL)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AntdSider
      width='var(--sider-width)'
      style={{
        overflow: 'auto',
        backgroundColor: '#f5f5f5',
        padding: 10,
        justifyContent: 'center',
        background: 'blue',
      }}
    >
      <Space direction='vertical' style={{ width: '100%', paddingBottom: 10 }}>
        <Button type='primary' style={{ width: '100%' }}>
          <PlusOutlined />
          Create Project
        </Button>
        {projects.map((project) => (
          <Card key={project.id}>
            <p>{project.title}</p>
            <p>{project.description}</p>
          </Card>
        ))}
      </Space>
    </AntdSider>
  );
};
