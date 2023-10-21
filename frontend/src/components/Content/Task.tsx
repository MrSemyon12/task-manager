import { ReactNode } from 'react';

import style from './Task.module.css';

type ChildrenProps = { children?: ReactNode; title?: string };

const Draggable: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className={style.draggable} draggable>
      {children}
    </div>
  );
};

export const Task: React.FC = () => {
  return (
    <Draggable>
      <div className={style.task}>Task</div>
    </Draggable>
  );
};
