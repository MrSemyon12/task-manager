import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Modal,
  Avatar,
  Tooltip,
  message,
  Row,
  Typography,
  Spin,
} from 'antd';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';

import { DELETE_PROJECT_URL, PROJECT_USERS_URL } from '../../api/urls';
import { useProject, useApiPrivate } from '../../hooks';
import { ProjectFormUpdate } from './ProjectFormUpdate';
import { UsersForm } from './UsersForm';
import { RoleTag } from '../RoleTag';
import { User } from '../../types';

const { Text, Title } = Typography;

const COLORS = [
  '#f56a00',
  '#fdd654',
  '#87d068',
  '#1677ff',
  '#974bd1',
  '#4bd1c8',
  '#f211e3',
];

export const ProjectInfo: React.FC = () => {
  const api = useApiPrivate();
  const { curProject, setCurProject, projects, setProjects } = useProject();
  const [users, setUsers] = useState<User[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUsersFormOpen, setIsUsersFormOpen] = useState(false);

  useEffect(() => {
    if (!curProject) return;
    setUsers([]);
    api
      .get(
        PROJECT_USERS_URL.replace(
          ':projectId',
          curProject.project.id.toString()
        )
      )
      .then((response) => setUsers(response.data))
      .catch(() => message.error('Service is not available', 5));
  }, [api, curProject]);

  const handleDelete = async () => {
    if (!curProject) return;
    setCurProject(null);

    try {
      await api.delete(
        DELETE_PROJECT_URL.replace(
          ':projectId',
          curProject.project.id.toString()
        )
      );
      setProjects(
        projects.filter((p) => p.project.id !== curProject.project.id)
      );
      message.success('Project deleted', 5);
    } catch (error) {
      message.error('Service is not available', 5);
    }
  };

  return (
    <Card
      title={
        <Row align='middle'>
          <Title level={4} style={{ margin: '0 10px 0 0' }}>
            {curProject?.project.title}
          </Title>
          {curProject && <RoleTag role={curProject.role} size='lg' />}
        </Row>
      }
      extra={
        curProject?.role.id === 1 && (
          <>
            <Button
              icon={<EditFilled />}
              style={{
                marginRight: 10,
                color: 'var(--color-secondary)',
              }}
              size='large'
              onClick={() => setIsFormOpen(true)}
            />
            <Button
              danger
              icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
              size='large'
              onClick={() => {
                Modal.confirm({
                  title: 'Delete project?',
                  content: 'All tasks will be permanently deleted',
                  footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                      <CancelBtn />
                      <OkBtn />
                    </>
                  ),
                  onOk: handleDelete,
                });
              }}
            />
          </>
        )
      }
      style={styleDescription}
      bodyStyle={{ padding: '10px 24px' }}
    >
      <Row justify='space-between' align='middle'>
        <Text italic style={{ fontSize: 18 }}>
          {curProject?.project.description}
        </Text>

        {!users ? (
          <Spin style={{ marginRight: 6 }} />
        ) : (
          <Avatar.Group
            shape='square'
            maxCount={7}
            maxPopoverTrigger='click'
            size='large'
            maxStyle={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
              cursor: 'pointer',
            }}
          >
            {users.map((user: User, idx) => (
              <Tooltip
                title={user.user.username}
                placement='top'
                key={user.user.id}
              >
                <Avatar
                  style={{
                    backgroundColor: COLORS[idx % COLORS.length],
                  }}
                  onClick={() => setIsUsersFormOpen(true)}
                >
                  {user.user.username[0].toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        )}
      </Row>

      <ProjectFormUpdate
        open={isFormOpen}
        closeForm={() => setIsFormOpen(false)}
      />

      <UsersForm
        open={isUsersFormOpen}
        closeForm={() => setIsUsersFormOpen(false)}
        colors={COLORS}
        users={users}
        setUsers={setUsers}
      />
    </Card>
  );
};

const styleDescription = {
  backgroundColor: 'var(--color-main)',
  boxShadow: 'var(--shadow)',
};
