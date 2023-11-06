import React, { useEffect, useState } from 'react';
import { Layout, Space, Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useApiPrivate, useProject } from '../../hooks';
import { Project } from '../../types';

const { Sider: AntdSider } = Layout;
const PROJECTS_URL = '/projects/my';

const gridStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  padding: 10,
};

const pickedStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  backgroundColor: 'coral',
  boxShadow: 'none',
};

export const Sider: React.FC = () => {
  const { project: cur, setProject } = useProject();
  const [projects, setProjects] = useState<Project[]>([]);
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
        background: 'blue',
        direction: 'rtl',
        // padding: 10,
        // justifyContent: 'center',
      }}
    >
      {/* <Space direction='vertical' style={{ width: '100%', paddingBottom: 10 }}> */}
      {/* <Button type='primary' style={{ width: '100%' }}>
        <PlusOutlined />
        Create Project
      </Button> */}
      <Card
        style={{
          border: 0,
          borderRadius: 0,
          direction: 'ltr',
          overflow: 'hidden',
        }}
      >
        {projects.map((project) => (
          <Card.Grid
            key={project.id}
            onClick={() => setProject(project)}
            style={cur?.id == project.id ? pickedStyle : gridStyle}
            hoverable={cur?.id != project.id}
          >
            {project.id}-{project.title}
          </Card.Grid>
        ))}
      </Card>
    </AntdSider>
  );
};
