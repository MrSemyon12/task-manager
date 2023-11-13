import { useState, useEffect } from 'react';
import { Layout, Card, Flex, message, Result } from 'antd';
import { PushpinFilled } from '@ant-design/icons';
import { DragDropContext } from 'react-beautiful-dnd';

import { useApiPrivate, useProject } from '../../hooks';
import { BASE_TASKS_URL } from '../../api/urls';
import { DroppableContainer } from './DroppableContainer';
import { reorder, remove, appendAt, makeBoards } from './utils';
import { Spinner } from '../Spinner';

const { Content: AntdContent } = Layout;

export const Content = () => {
  const api = useApiPrivate();
  const { project } = useProject();
  const [boards, setBoards] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!project) return;

    setIsLoading(true);
    api
      .get(BASE_TASKS_URL.replace(':id', project.id))
      .then((response) => {
        setBoards(makeBoards(response.data));
      })
      .catch(() => {
        message.error('Service is not available', 5);
      })
      .finally(() => setIsLoading(false));
  }, [project]);

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

  if (!project)
    return (
      <AntdContent style={styleTemplate}>
        <Result
          icon={
            <PushpinFilled
              style={{ marginTop: '20vh', color: 'var(--color-secondary)' }}
            />
          }
          subTitle='Select a project or create a new one'
          style={{ colorTextHeading: 'white' }}
        />
      </AntdContent>
    );

  return (
    <AntdContent style={styleContent}>
      <Card style={styleDescription}>{project?.description}</Card>
      {isLoading ? (
        <Spinner />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Flex style={styleDroppable}>
            <DroppableContainer header='Open' tasks={boards.open} />
            <DroppableContainer header='Progress' tasks={boards.progress} />
            <DroppableContainer header='Done' tasks={boards.done} />
            <DroppableContainer header='Closed' tasks={boards.closed} />
          </Flex>
        </DragDropContext>
      )}
    </AntdContent>
  );
};

const styleContent = {
  overflow: 'auto',
  padding: 10,
  backgroundColor: 'var(--color-background)',
};

const styleTemplate = {
  backgroundColor: 'var(--color-background)',
};

const styleDescription = {
  backgroundColor: 'var(--color-main)',
  boxShadow: 'var(--shadow)',
};

const styleDroppable = {
  width: '100%',
  marginTop: 10,
  alignItems: 'start',
  gap: 10,
};
