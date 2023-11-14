import React from 'react';
import { Button, Card } from 'antd';
import { StrictModeDroppable } from './StrictModeDroppable';
import { PlusOutlined } from '@ant-design/icons';

import { Task } from '../../types';
import { TaskCard } from '../TaskCard';
import { Draggable } from 'react-beautiful-dnd';

type DroppableContainerProps = { header: string; tasks: Task[] };

export const DroppableContainer: React.FC<DroppableContainerProps> = ({
  header,
  tasks,
}) => {
  return (
    <Card
      title={header}
      extra={
        <Button
          icon={
            <PlusOutlined
              style={{ fontSize: 22, color: 'var(--color-secondary)' }}
            />
          }
        />
      }
      style={style}
      headStyle={{ fontSize: 20 }}
      bodyStyle={{ padding: 5 }}
    >
      <StrictModeDroppable droppableId={header.toLowerCase()}>
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
