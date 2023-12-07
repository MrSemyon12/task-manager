import React, { Dispatch, SetStateAction } from 'react';
import { Modal, List, Avatar, Select, Button, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';

import { PROJECT_USERS_URL } from '../../api/urls';
import { useApiPrivate, useProject, useAuth } from '../../hooks';
import { RoleTag } from '../RoleTag';
import { User } from '../../types';

const ROLES = [
  { value: 1, label: 'manager' },
  { value: 2, label: 'worker' },
  { value: 3, label: 'guest' },
];

type UsersFormProps = {
  open: boolean;
  closeForm: Function;
  colors: string[];
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
};

export const UsersForm: React.FC<UsersFormProps> = ({
  open,
  closeForm,
  colors,
  users,
  setUsers,
}) => {
  const api = useApiPrivate();
  const { curProject } = useProject();

  const { auth } = useAuth();
  const username = auth ? jwtDecode(auth.access_token).sub : null;

  const handleOk = () => closeForm();

  const handleCancel = () => closeForm();

  const handleDelete = async (userId: number) => {
    if (!curProject) return;

    try {
      await api.delete(
        PROJECT_USERS_URL.replace(
          ':projectId',
          curProject.project.id.toString()
        ),
        { data: userId }
      );
      setUsers((prev) => prev.filter((user) => user.user.id != userId));
      message.success('User deleted', 5);
    } catch (error) {
      message.error('Service is not available', 5);
    }
  };

  const handleChange = async (roleId: string, userId: number) => {
    if (!curProject) return;

    try {
      const response = await api.patch(
        PROJECT_USERS_URL.replace(
          ':projectId',
          curProject.project.id.toString()
        ),
        { role_id: roleId, user_id: userId }
      );
      setUsers((prev) =>
        prev.map((user: User) => {
          if (user.user.id === userId) return response.data;
          return user;
        })
      );
      message.success('Role updated', 5);
    } catch (error) {
      message.error('Service is not available', 5);
    }
  };

  return (
    <Modal
      title='Project users'
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={(_, { OkBtn }) => <OkBtn />}
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
            {curProject?.role.id === 1 && item.user.username !== username && (
              <>
                <Select
                  defaultValue={item.role.title}
                  style={{ width: 100, marginRight: 10 }}
                  options={ROLES}
                  onChange={(value) => handleChange(value, item.user.id)}
                />
                <Button
                  danger
                  icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
                  onClick={() => {
                    Modal.confirm({
                      title: 'Delete user?',
                      content: 'User will no longer have access to the project',
                      footer: (_, { OkBtn, CancelBtn }) => (
                        <>
                          <CancelBtn />
                          <OkBtn />
                        </>
                      ),
                      onOk: () => handleDelete(item.user.id),
                    });
                  }}
                />
              </>
            )}
          </List.Item>
        )}
      />
    </Modal>
  );
};
