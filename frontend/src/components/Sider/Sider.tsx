import React, { useEffect, useState } from 'react';
import { Layout, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useApiPrivate, useProject } from '../../hooks';
import { USER_PROJECTS_URL } from '../../api/urls';
import { ProjectForm } from './ProjectForm';
import { Project } from '../../types';

const { Sider: AntdSider } = Layout;

export const Sider: React.FC = () => {
  const { project: curProject, setProject } = useProject();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const apiPrivate = useApiPrivate();

  useEffect(() => {
    apiPrivate
      .get(USER_PROJECTS_URL)
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
        <Card.Grid style={buttonStyle} onClick={() => setIsFormOpen(true)}>
          <PlusOutlined style={{ fontSize: 28, color: 'var(--color-main)' }} />
        </Card.Grid>
        {projects.map((project) => (
          <Card.Grid
            key={project.id}
            onClick={() => setProject(project)}
            style={curProject?.id === project.id ? pickedStyle : gridStyle}
            hoverable={curProject?.id !== project.id}
          >
            <h3>{project.title}</h3>
          </Card.Grid>
        ))}
      </Card>
      <ProjectForm
        open={isFormOpen}
        closeForm={() => setIsFormOpen(false)}
        projects={projects}
        setProjects={setProjects}
      />
    </AntdSider>
  );
};

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
