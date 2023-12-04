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
import { User } from '../../types';

const { Text, Title } = Typography;

export const ProjectInfo: React.FC = () => {
  const api = useApiPrivate();
  const { curProject, setCurProject, projects, setProjects } = useProject();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!curProject) return;
    setUsers([]);
    api
      .get(PROJECT_USERS_URL.replace(':projectId', curProject.id.toString()))
      .then((response) => setUsers(response.data))
      .catch(() => message.error('Service is not available', 5));
  }, [api, curProject]);

  const handleDelete = async () => {
    if (!curProject) return;
    setCurProject(null);

    try {
      await api.delete(
        DELETE_PROJECT_URL.replace(':projectId', curProject.id.toString())
      );
      setProjects(projects.filter((p) => p.id !== curProject.id));
      message.success('Project deleted', 5);
    } catch (error) {
      message.error('Service is not available', 5);
    }
  };

  return (
    <Card
      title={
        <Row align='middle'>
          <Title level={4} style={{ margin: 0 }}>
            {curProject?.title}
          </Title>
          <Button type='text' icon={<EditFilled />} />
        </Row>
      }
      extra={
        <Button
          danger
          icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
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
      }
      style={styleDescription}
      bodyStyle={{ padding: '10px 24px' }}
    >
      <Row justify='space-between' align='middle'>
        <Text italic style={{ fontSize: 18 }}>
          {curProject?.description}
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
            {users.map((user: User) => (
              <Tooltip
                title={user.user.username}
                placement='top'
                key={user.user.id}
              >
                <Avatar
                  style={{
                    backgroundColor:
                      '#' + Math.floor(Math.random() * 16777215).toString(16),
                  }}
                >
                  {user.user.username[0].toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        )}
      </Row>
    </Card>
  );
};

const styleDescription = {
  backgroundColor: 'var(--color-main)',
  boxShadow: 'var(--shadow)',
};
