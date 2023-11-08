import React from 'react';
import { Card } from 'antd';
import { StrictModeDroppable } from './StrictModeDroppable';

import { Task } from '../../types';
import { Draggable } from 'react-beautiful-dnd';

type DroppableContainerProps = { header: string; tasks: Task[] };

export const DroppableContainer: React.FC<DroppableContainerProps> = ({
  header,
  tasks,
}) => {
  return (
    <Card title={header} style={style} bodyStyle={{ padding: 5 }}>
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
                    <Card
                      title={task.title}
                      style={{ backgroundColor: 'coral' }}
                    ></Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder && <Placeholder />}
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
  width: '100%',
};
