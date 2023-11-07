import React from 'react';
import { Layout, Card } from 'antd';

import { useProject } from '../../hooks';

const { Content: AntdContent } = Layout;

export const Content: React.FC = () => {
  const { project } = useProject();

  return (
    <AntdContent
      style={{
        overflow: 'auto',
        padding: 10,
        backgroundColor: 'var(--color-background)',
      }}
    >
      <Card>{project?.description}</Card>
    </AntdContent>
  );
};
