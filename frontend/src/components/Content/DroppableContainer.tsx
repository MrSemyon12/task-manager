import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Card } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import { PlusOutlined } from '@ant-design/icons';

import { Task } from '../../types';
import { StrictModeDroppable } from './StrictModeDroppable';
import { TaskCard } from '../TaskCard';
import { TaskForm } from './TaskForm';

type DroppableContainerProps = {
  state: {
    id: number;
    title: string;
  };
  setBoards: Dispatch<SetStateAction<any>>;
  tasks: Task[];
};

export const DroppableContainer: React.FC<DroppableContainerProps> = ({
  state,
  setBoards,
  tasks,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

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
              <Draggable key={task.id} draggableId={task.title} index={index}>
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
        setBoards={setBoards}
      />
    </Card>
  );
};

const Placeholder = () => {
  return <div style={{ height: '200px' }}></div>;
};

const style: React.CSSProperties = {
  width: 'calc((100vw - var(--sider-width) - 50px) / 4)',
  backgroundColor: 'var(--color-main)',
  boxShadow: 'var(--shadow)',
};
