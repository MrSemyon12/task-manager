import React, { useState } from 'react';
import { Modal, Switch, Form, Input, message } from 'antd';

import { UPDATE_PROJECT_URL } from '../../api/urls';
import { useApiPrivate, useProject } from '../../hooks';

type ProjectFormUpdateProps = {
  open: boolean;
  closeForm: Function;
};

type ProjectUpdate = {
  title: string;
  description: string;
  is_private: boolean;
};

export const ProjectFormUpdate: React.FC<ProjectFormUpdateProps> = ({
  open,
  closeForm,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { curProject, setCurProject, projects, setProjects } = useProject();
  const api = useApiPrivate();
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    closeForm();
  };

  const handleSubmit = async (data: ProjectUpdate) => {
    if (!curProject) return;

    setConfirmLoading(true);

    try {
      const response = await api.put(
        UPDATE_PROJECT_URL.replace(
          ':projectId',
          curProject.project.id.toString()
        ),
        data
      );
      const newProjects = projects.map((p) => {
        if (p.project.id === curProject.project.id) {
          const newP = { project: response.data, role: p.role };
          setCurProject(newP);
          return newP;
        } else return p;
      });
      setProjects(newProjects);
      message.success('Project updated', 5);
      closeForm();
    } catch (error) {
      message.error('Service is not available', 5);
    } finally {
      setConfirmLoading(false);
    }
  };
  return (
    <Modal
      title='Update project'
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      afterOpenChange={() => form.resetFields()}
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        form={form}
        initialValues={{
          title: curProject?.project.title,
          description: curProject?.project.description,
          is_private: curProject?.project.is_private,
        }}
        name='project'
        onFinish={handleSubmit}
        style={{ marginTop: 30 }}
        scrollToFirstError
      >
        <Form.Item
          name='title'
          label='Title'
          rules={[
            {
              required: true,
              message: 'Please fill in title',
            },
            {
              max: 32,
              message: 'Max length is 32 characters',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name='description' label='Description'>
          <Input.TextArea showCount maxLength={200} style={{ height: 150 }} />
        </Form.Item>

        <Form.Item valuePropName='checked' name='is_private' label='Private'>
          <Switch checkedChildren='Yes' unCheckedChildren='No' />
        </Form.Item>
      </Form>
    </Modal>
  );
};
