import React, { useState } from 'react';
import { Modal, List, Avatar } from 'antd';

import { BASE_TASKS_URL } from '../../api/urls';
import { useApiPrivate, useProject, useBoard } from '../../hooks';
import { RoleTag } from '../RoleTag';
import { User } from '../../types';

type UsersFormProps = {
  open: boolean;
  closeForm: Function;
  colors: string[];
  users: User[];
};

export const UsersForm: React.FC<UsersFormProps> = ({
  open,
  closeForm,
  colors,
  users,
}) => {
  const api = useApiPrivate();

  const handleOk = () => closeForm();

  const handleCancel = () => closeForm();

  return (
    <Modal
      title='Project users'
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <List
        itemLayout='horizontal'
        dataSource={users}
        renderItem={(item, idx) => (
          <List.Item key={item.user.id}>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{
                    backgroundColor: colors[idx % colors.length],
                  }}
                >
                  {item.user.username[0].toUpperCase()}
                </Avatar>
              }
              title={item.user.username}
              description={<RoleTag role={item.role} size='lg' />}
            />
            <div>Content</div>
          </List.Item>
        )}
      />
    </Modal>
  );
};
