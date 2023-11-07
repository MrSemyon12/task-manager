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
      <StrictModeDroppable droppableId={header}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((mon, index) => (
              <Draggable key={mon.id} draggableId={mon.title} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card
                      title={mon.title}
                      style={{ backgroundColor: 'coral' }}
                    ></Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </Card>
  );
};

const style: React.CSSProperties = {
  width: '390px',
  height: '710px',
};
