import React from 'react';
import { Card } from 'antd';

import { Task } from '../../types';

type TaskProps = { task: Task };

const COLORS = ['', '#f78888', '#F3D250', '#90CCF4'];

export const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const style: React.CSSProperties = {
    backgroundColor: COLORS[task.priority.id],
    wordWrap: 'break-word',
  };

  return (
    <Card title={task.title} style={style} size='small'>
      {task.description}
    </Card>
  );
};
