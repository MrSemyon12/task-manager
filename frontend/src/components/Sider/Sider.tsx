import React, { useEffect, useState } from 'react';
import { Layout, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useApiPrivate, useProject } from '../../hooks';
import { Project } from '../../types';

const { Sider: AntdSider } = Layout;
const PROJECTS_URL = '/projects/my';

const gridStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  padding: 10,
  backgroundColor: 'var(--color-main)',
};

const pickedStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  backgroundColor: 'var(--color-background)',
  boxShadow: 'inset 5px 5px 5px 0 rgba(0, 0, 0, 0.12)',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  backgroundColor: 'var(--color-accent)',
  padding: 10,
  color: 'var(--color-main)',
};

export const Sider: React.FC = () => {
  const { project: cur, setProject } = useProject();
  const [projects, setProjects] = useState<Project[]>([]);
  const apiPrivate = useApiPrivate();

  useEffect(() => {
    apiPrivate
      .get(PROJECTS_URL)
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  }, [apiPrivate]);

  return (
    <AntdSider
      width='var(--sider-width)'
      style={{
        overflow: 'auto',
        background: 'var(--color-accent)',
        direction: 'rtl',
      }}
    >
      <Card
        style={{
          border: 0,
          borderRadius: 0,
          direction: 'ltr',
          overflow: 'hidden',
        }}
      >
        <Card.Grid style={buttonStyle}>
          <PlusOutlined style={{ fontSize: 28 }} />
        </Card.Grid>
        {projects.map((project) => (
          <Card.Grid
            key={project.id}
            onClick={() => setProject(project)}
            style={cur?.id === project.id ? pickedStyle : gridStyle}
            hoverable={cur?.id !== project.id}
          >
            <h3>{project.title}</h3>
          </Card.Grid>
        ))}
      </Card>
    </AntdSider>
  );
};
