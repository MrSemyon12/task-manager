import React, { useState } from 'react';
import { Layout, Card, Space } from 'antd';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { useProject } from '../../hooks';
import { DroppableContainer } from './DroppableContainer';
import { reorder, remove, appendAt } from './utils';
import { Task } from '../../types';

const { Content: AntdContent } = Layout;

const TASKS = {
  open: [
    {
      id: 1,
      title: 'sstring',
      description: 'ssdasd',
      deadline: 'string',
      stateId: 1,
    },
  ],
  progress: [
    {
      id: 3,
      title: 'aaaaaa',
      description: 'ssdasd',
      deadline: 'string',
      stateId: 2,
    },
    {
      id: 4,
      title: 'bbbbbbbb',
      description: 'ssdasd',
      deadline: 'string',
      stateId: 2,
    },
  ],
  done: [
    {
      id: 2,
      title: 'asdasd',
      description: 'ssdasd',
      deadline: 'string',
      stateId: 3,
    },
  ],
  close: [],
};

export const Content: React.FC = () => {
  const { project } = useProject();
  const [tasks, setTasks] = useState(TASKS);

  function handleDragEnd(result: DropResult) {
    const src = result.source;
    const dest = result.destination;

    // Dropped outside the list
    if (!dest) return;

    if (src.droppableId === dest.droppableId) {
      // --- SAME CONTAINER ---
      // If same container, just reorder

      const items = reorder([...tasks.progress], src.index, dest.index);

      // Set the correct pokedex category
      const tempPokedex = { ...tasks };
      tempPokedex.progress = items;
      setTasks({ ...tempPokedex });
    } else {
      // --- DIFFERENT CONTAINER ---
      // Otherwise, we need to handle source and destination
      // Remove from the source list
      // const srcItems = remove(tasks, src.index);
      // // Add to the new list
      // const destItems = appendAt(tasks, dest.index, tasks[src.index]);
      // // Set new tasks values
      // let temptasks = [...tasks];
      // temptasks = srcItems;
      // temptasks = destItems;
      // setTasks({ ...temptasks });
    }
  }

  return (
    <AntdContent
      style={{
        overflow: 'auto',
        padding: 10,
        backgroundColor: 'var(--color-background)',
      }}
    >
      <Card>{project?.description}</Card>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Space style={{ width: '100%', marginTop: 10 }}>
          <DroppableContainer header='open' tasks={tasks.open} />
          <DroppableContainer header='progress' tasks={tasks.progress} />
          <DroppableContainer header='done' tasks={tasks.done} />
          <DroppableContainer header='cancelled' tasks={tasks.close} />
        </Space>
      </DragDropContext>
    </AntdContent>
  );
};
