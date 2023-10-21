import { ReactNode } from 'react';

import style from './TaskGroup.module.css';

type ChildrenProps = { children?: ReactNode; title?: string };

const Droppable: React.FC<ChildrenProps> = ({ children }) => {
  return <div className={style.droppable}>{children}</div>;
};

export const TaskGroup: React.FC<ChildrenProps> = ({ children, title }) => {
  return (
    <div className={style.container}>
      <h2 className={style.container_header}>{title}</h2>
      <Droppable>{children}</Droppable>
    </div>
  );
};
