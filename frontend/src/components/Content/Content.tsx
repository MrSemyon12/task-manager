import React from 'react';

import { Layout, Card } from 'antd';
import { useLocalStorage } from '../../hooks';

const { Content: AntdContent } = Layout;

export const Content: React.FC = () => {
  const [name, setName] = useLocalStorage('name', 'Semyon');

  return (
    <AntdContent
      style={{
        overflow: 'auto',
        padding: 10,
        backgroundColor: 'coral',
      }}
    >
      <Card>
        <input onChange={(e) => setName(e.target.value)} value={name} />
      </Card>
    </AntdContent>
  );
};
