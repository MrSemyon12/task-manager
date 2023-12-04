import React from 'react';
import {
  Button,
  Card,
  Modal,
  Avatar,
  Tooltip,
  message,
  Row,
  Typography,
} from 'antd';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';

import { useProject, useApiPrivate } from '../../hooks';
import { DELETE_PROJECT_URL } from '../../api/urls';

const { Text, Title } = Typography;

export const ProjectInfo: React.FC = () => {
  const api = useApiPrivate();
  const { curProject, setCurProject, projects, setProjects } = useProject();

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
          <Tooltip title='Ant User' placement='top'>
            <Avatar style={{ backgroundColor: '#87d068' }}>A</Avatar>
          </Tooltip>
          <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
          <Avatar style={{ backgroundColor: '#87d068' }}>И</Avatar>
          <Avatar style={{ backgroundColor: '#1677ff' }}>R</Avatar>
          <Avatar style={{ backgroundColor: '#fde3cf' }}>A</Avatar>
          <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
          <Avatar style={{ backgroundColor: '#87d068' }}>И</Avatar>
          <Avatar style={{ backgroundColor: '#1677ff' }}>R</Avatar>
          <Avatar style={{ backgroundColor: '#fde3cf' }}>A</Avatar>
          <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
          <Avatar style={{ backgroundColor: '#87d068' }}>И</Avatar>
          <Tooltip title='Ant User' placement='top'>
            <Avatar style={{ backgroundColor: '#87d068' }}>A</Avatar>
          </Tooltip>
        </Avatar.Group>
      </Row>
    </Card>
  );
};

const styleDescription = {
  backgroundColor: 'var(--color-main)',
  boxShadow: 'var(--shadow)',
};
