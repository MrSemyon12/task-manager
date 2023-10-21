import React, { useState } from 'react';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Layout, Flex, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { TaskGroup } from './TaskGroup';
import { Panel } from './Panel';
import { Task } from './Task';

const { Content: AntdContent } = Layout;

const listItems = [
  {
    id: '1',
    name: 'Study Spanish',
  },
  {
    id: '2',
    name: 'Workout',
  },
  {
    id: '3',
    name: 'Film Youtube',
  },
  {
    id: '4',
    name: 'Grocery Shop',
  },
];

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `0 50px 15px 50px`,
  background: isDragging ? '#4a2975' : 'white',
  color: isDragging ? 'white' : 'black',
  border: `1px solid black`,
  fontSize: `20px`,
  borderRadius: `5px`,

  ...draggableStyle,
});

export const Content: React.FC = () => {
  const [tasks, setTasks] = useState(listItems);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [newOrder] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, newOrder);

    setTasks(items);
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
        <DragDropContext onDragEnd={onDragEnd}>
          <TaskGroup title='open' tasks={tasks}>
            <Button type='primary' style={{ width: '100%' }}>
              <PlusOutlined />
              Create Task
            </Button>
          </TaskGroup>
          <TaskGroup title='in progress'></TaskGroup>
          <TaskGroup title='closed'></TaskGroup>
          <TaskGroup title='cancelled'></TaskGroup>
        </DragDropContext>
      </Flex>
    </AntdContent>
  );
};
