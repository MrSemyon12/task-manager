import React from 'react';
import { Tag } from 'antd';
import { Role } from '../../types';

type RoleTagProps = {
  role: Role;
  size: 'sm' | 'lg';
};

const COLORS = ['', '#f211e3', '#87d068', '#1677ff', '#c8cfdb'];

export const RoleTag: React.FC<RoleTagProps> = ({ role, size }) => {
  return (
    <Tag color={COLORS[role.id]} style={{ marginRight: 5 }}>
      {size === 'sm' ? role.title[0].toUpperCase() : role.title.toUpperCase()}
    </Tag>
  );
};
