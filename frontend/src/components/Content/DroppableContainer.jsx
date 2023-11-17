import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import { PlusOutlined } from '@ant-design/icons';

import { useBoard } from '../../hooks';
import { StrictModeDroppable } from './StrictModeDroppable';
import { TaskCard } from '../TaskCard';
import { TaskForm } from './TaskForm';

export const DroppableContainer = ({ state }) => {
  const { board } = useBoard();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const tasks = board[state.title.toLowerCase()];

  return (
    <Card
      title={state.title}
      extra={
        <Button
          icon={
            <PlusOutlined
              style={{ fontSize: 22, color: 'var(--color-secondary)' }}
            />
          }
          onClick={() => setIsFormOpen(true)}
        />
      }
      style={style}
      headStyle={{ fontSize: 20 }}
      bodyStyle={{ padding: 5 }}
    >
      <StrictModeDroppable droppableId={state.title.toLowerCase()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder && <Placeholder />}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
      <TaskForm
        open={isFormOpen}
        closeForm={() => setIsFormOpen(false)}
        state={state}
      />
    </Card>
  );
};

const Placeholder = () => {
  return <div style={{ height: '200px' }}></div>;
};

const style = {
  width: 'calc((100vw - var(--sider-width) - 50px) / 4)',
  backgroundColor: 'var(--color-main)',
  boxShadow: 'var(--shadow)',
};
