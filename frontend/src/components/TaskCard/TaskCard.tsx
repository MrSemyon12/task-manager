import React, { useState } from 'react';
import { Button, Card, Modal, message, Typography } from 'antd';
import { EditFilled, CloseOutlined } from '@ant-design/icons';

import { TaskFormUpdate } from './TaskFormUpdate';
import { DELETE_TASKS_URL } from '../../api/urls';
import { useApiPrivate, useProject, useBoard } from '../../hooks';
import { Task } from '../../types';

type TaskProps = { task: Task };

const { Text } = Typography;
const COLORS = ['', '#f78888', '#fdd654', '#87d068'];

export const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const { curProject } = useProject();
  const { setBoard } = useBoard();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const api = useApiPrivate();

  const style: React.CSSProperties = {
    backgroundColor: COLORS[task.priority.id],
    wordWrap: 'break-word',
  };

  const handleDelete = async () => {
    if (!curProject) return;

    try {
      await api.delete(
        DELETE_TASKS_URL.replace(
          ':projectId',
          curProject.project.id.toString()
        ).replace(':taskId', task.id.toString())
      );
      setBoard((prev: any) => {
        const newBoard = { ...prev };
        const newTasks = newBoard[task.state.title].filter(
          (t: Task) => t.id !== task.id
        );
        newBoard[task.state.title] = newTasks;
        return newBoard;
      });
      message.success('Task deleted', 5);
    } catch (error) {
      message.error('Service is not available', 5);
    }
  };

  return (
    <Card
      title={
        <>
          {task.title}
          {curProject?.role.id === 1 && (
            <Button
              type='text'
              icon={<EditFilled />}
              onClick={() => setIsFormOpen(true)}
            />
          )}
        </>
      }
      style={style}
      size='small'
      extra={
        curProject?.role.id === 1 && (
          <Button
            type='text'
            icon={<CloseOutlined />}
            onClick={() => {
              Modal.confirm({
                title: 'Delete task?',
                content: 'Progress will be permanently deleted',
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
        )
      }
    >
      <Text italic>{task.description}</Text>
      <TaskFormUpdate
        open={isFormOpen}
        closeForm={() => setIsFormOpen(false)}
        task={task}
      />
    </Card>
  );
};
