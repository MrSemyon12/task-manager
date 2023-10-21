import React, { useState } from 'react';

import { Layout, Flex, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { TaskGroup } from './TaskGroup';
import { Panel } from './Panel';
import { Task } from './Task';

const { Content: AntdContent } = Layout;

const tsc = [...Array(10)].map((_) => <Task />);

export const Content: React.FC = () => {
  const [tasks, setTasks] = useState(tsc);

  const add = () => {
    setTasks([...tasks, <Task />]);
  };

  return (
    <AntdContent
      style={{
        overflow: 'auto',
        height: 'calc(100vh - 108px)',
        padding: 10,
        backgroundColor: 'coral',
      }}
    >
      <Panel />
      <Flex justify='space-between'>
        <TaskGroup title='open'>
          <Button type='primary' onClick={add} style={{ width: '100%' }}>
            Create Task
          </Button>
          {tasks}
        </TaskGroup>
        <TaskGroup title='in progress'></TaskGroup>
        <TaskGroup title='closed'></TaskGroup>
        <TaskGroup title='cancelled'>{tasks}</TaskGroup>
      </Flex>
    </AntdContent>
  );
};
