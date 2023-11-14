import { useState, useEffect } from 'react';
import { Layout, Button, Card, Flex, message, Result, Modal } from 'antd';
import { PushpinFilled, DeleteOutlined, EditFilled } from '@ant-design/icons';
import { DragDropContext } from 'react-beautiful-dnd';

import { useApiPrivate, useProject } from '../../hooks';
import { BASE_TASKS_URL, DELETE_PROJECT_URL } from '../../api/urls';
import { DroppableContainer } from './DroppableContainer';
import { reorder, remove, appendAt, makeBoards } from './utils';
import { Spinner } from '../Spinner';

const { Content: AntdContent } = Layout;

export const Content = () => {
  const api = useApiPrivate();
  const { curProject, setCurProject, projects, setProjects } = useProject();
  const [boards, setBoards] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!curProject) return;

    setIsLoading(true);
    api
      .get(BASE_TASKS_URL.replace(':id', curProject.id))
      .then((response) => {
        setBoards(makeBoards(response.data));
      })
      .catch(() => {
        message.error('Service is not available', 5);
      })
      .finally(() => setIsLoading(false));
  }, [curProject]);

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

  const handleDelete = async () => {
    setCurProject(null);

    try {
      await api.delete(DELETE_PROJECT_URL.replace(':id', curProject.id));
      setProjects(projects.filter((p) => p.id != curProject.id));
      message.success('Project deleted', 5);
    } catch (error) {
      message.error('Service is not available', 5);
    }
  };

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
      <Card
        title={
          <>
            {curProject.title}
            <Button
              type='text'
              style={{ marginLeft: 5 }}
              icon={<EditFilled style={{ color: 'var(--color-secondary)' }} />}
            />
          </>
        }
        extra={
          <Button
            danger
            icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
            onClick={() => {
              Modal.confirm({
                title: 'Delete project?',
                content: 'All tasks will be permanently deleted',
                footer: (_, { OkBtn, CancelBtn }) => (
                  <>
                    <CancelBtn />
                    <OkBtn />
                  </>
                ),
                onOk: handleDelete,
              });
            }}
          />
        }
        style={styleDescription}
      >
        {curProject?.description}
      </Card>
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
