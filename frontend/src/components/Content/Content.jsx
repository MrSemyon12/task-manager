import { useState } from 'react';
import { Layout, Card, Flex, Space } from 'antd';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { useProject } from '../../hooks';
import { DroppableContainer } from './DroppableContainer';
import { reorder, remove, appendAt } from './utils';

const { Content: AntdContent } = Layout;

const BOARDS = {
  open: [
    {
      id: 1,
      title: 'sstring',
      description: 'ssdasd',
      deadline: 'string',
      stateId: 1,
    },
    {
      id: 5,
      title: 'dumau',
      description: 'abcdefg',
      deadline: 'string',
      stateId: 1,
    },
    {
      id: 6,
      title: 'dumaueeeeeeeeeeeeee',
      description: 'abcdefg',
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

export const Content = () => {
  const { project } = useProject();
  const [boards, setBoards] = useState(BOARDS);

  function handleDragEnd(result) {
    const src = result.source;
    const dest = result.destination;

    // Dropped outside the list
    if (!dest) return;

    if (src.droppableId === dest.droppableId) {
      // --- SAME CONTAINER ---
      // If same container, just reorder

      const items = reorder(
        [...boards[src.droppableId]],
        src.index,
        dest.index
      );
      
      const tempBoards = { ...boards };
      tempBoards[src.droppableId] = items;
      setBoards({ ...tempBoards });
    } else {
      // --- DIFFERENT CONTAINER ---

      const srcItems = remove(boards[src.droppableId], src.index);
      
      const destItems = appendAt(
        boards[dest.droppableId],
        dest.index,
        boards[src.droppableId][src.index]
      );

      const tempBoards = { ...boards };
      tempBoards[src.droppableId] = srcItems;
      tempBoards[dest.droppableId] = destItems;
      setBoards({ ...tempBoards });
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
        <Flex style={{ width: '100%', marginTop: 10, alignItems: 'start', gap: 10 }}>
          <DroppableContainer header='Open' tasks={boards.open} />
          <DroppableContainer header='Progress' tasks={boards.progress} />
          <DroppableContainer header='Done' tasks={boards.done} />
          <DroppableContainer header='Close' tasks={boards.close} />
        </Flex>
      </DragDropContext>
    </AntdContent>
  );
};
