import { useState, useEffect } from 'react';
import { Layout, Flex, message, Result } from 'antd';
import { PushpinFilled } from '@ant-design/icons';
import { DragDropContext } from 'react-beautiful-dnd';

import { useApiPrivate, useProject, useBoard } from '../../hooks';
import { BASE_TASKS_URL, UPDATE_TASKS_STATE_URL } from '../../api/urls';
import { DroppableContainer } from './DroppableContainer';
import { reorder, remove, appendAt, makeBoards } from './utils';
import { Spinner } from '../Spinner';
import { ProjectInfo } from './ProjectInfo';

const { Content: AntdContent } = Layout;

const STATES = {
  open: 1,
  progress: 2,
  done: 3,
  closed: 4,
};

export const Content = () => {
  const api = useApiPrivate();
  const { curProject } = useProject();
  const { board, setBoard } = useBoard();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!curProject) return;

    setIsLoading(true);
    api
      .get(
        BASE_TASKS_URL.replace(':projectId', curProject.project.id.toString())
      )
      .then((response) => {
        setBoard(makeBoards(response.data));
      })
      .catch(() => {
        message.error('Service is not available', 5);
      })
      .finally(() => setIsLoading(false));
  }, [curProject, setBoard, api]);

  const handleUpdateState = async (taskId, state, prevBoard) => {
    try {
      await api.patch(
        UPDATE_TASKS_STATE_URL.replace(
          ':projectId',
          curProject.project.id.toString()
        ).replace(':taskId', taskId.toString()),
        STATES[state]
      );

      message.success('Successful update', 2);
    } catch (error) {
      setBoard(prevBoard);

      error.response.status === 403
        ? message.warning('Access denied', 5)
        : message.error('Service is not available', 5);
    }
  };

  function handleDragEnd(result) {
    const src = result.source;
    const dest = result.destination;

    // Dropped outside the list
    if (!dest) return;

    if (src.droppableId === dest.droppableId) {
      // --- SAME CONTAINER ---
      // If same container, just reorder

      const items = reorder([...board[src.droppableId]], src.index, dest.index);

      const tempBoards = { ...board };
      tempBoards[src.droppableId] = items;
      setBoard({ ...tempBoards });
    } else {
      // --- DIFFERENT CONTAINER ---

      handleUpdateState(
        board[src.droppableId][src.index].id,
        dest.droppableId,
        { ...board }
      );
      const srcItems = remove(board[src.droppableId], src.index);

      const destItems = appendAt(
        board[dest.droppableId],
        dest.index,
        board[src.droppableId][src.index]
      );

      const tempBoards = { ...board };
      tempBoards[src.droppableId] = srcItems;
      tempBoards[dest.droppableId] = destItems;
      setBoard({ ...tempBoards });
    }
  }

  if (!curProject)
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
      <ProjectInfo />
      {isLoading ? (
        <Spinner />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Flex style={styleDroppable}>
            <DroppableContainer state={{ id: 1, title: 'Open' }} />
            <DroppableContainer state={{ id: 2, title: 'Progress' }} />
            <DroppableContainer state={{ id: 3, title: 'Done' }} />
            <DroppableContainer state={{ id: 4, title: 'Closed' }} />
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

const styleDroppable = {
  width: '100%',
  marginTop: 10,
  alignItems: 'start',
  gap: 10,
};
