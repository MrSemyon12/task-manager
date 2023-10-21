import { ReactNode } from 'react';

import { Droppable } from 'react-beautiful-dnd';

import { Task } from './Task';

import style from './TaskGroup.module.css';

type ChildrenProps = { children?: ReactNode; title?: string; tasks?: any[] };

export const TaskGroup: React.FC<ChildrenProps> = ({
  children,
  title,
  tasks,
}) => {
  return (
    <div className={style.container}>
      <h2 className={style.container_header}>{title}</h2>
      {children}
      <Droppable droppableId='task'>
        {(provided) => (
          <div
            className='task'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks &&
              tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
