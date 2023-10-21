import { ReactNode } from 'react';

import { Draggable } from 'react-beautiful-dnd';

import style from './Task.module.css';

type ChildrenProps = { task: any; index: any };

export const Task: React.FC<ChildrenProps> = ({ task, index }) => {
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={style.task}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.name}
        </div>
      )}
    </Draggable>
  );
};
