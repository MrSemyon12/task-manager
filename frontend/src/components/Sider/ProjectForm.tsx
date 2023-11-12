import React, { useState } from 'react';
import { Modal, Switch, Form, Input, message } from 'antd';

import { BASE_PROJECTS_URL } from '../../api/urls';
import { useApiPrivate } from '../../hooks';

type ProjectFormProps = {
  open: boolean;
  closeForm: Function;
};

type ProjectCreate = {
  title: string;
  description: string;
  is_private: boolean;
};

export const ProjectForm: React.FC<ProjectFormProps> = ({
  open,
  closeForm,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const apiPrivate = useApiPrivate();
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    closeForm();
  };

  const handleSubmit = async (data: ProjectCreate) => {
    setConfirmLoading(true);

    try {
      await apiPrivate.post(BASE_PROJECTS_URL, data);
      message.success('Project created', 5);
      closeForm();
    } catch (error) {
      message.error('Service is not available', 5);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title='Create project'
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      afterClose={() => form.resetFields()}
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        form={form}
        initialValues={{ title: '', description: '', is_private: false }}
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
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please fill in description' }]}
        >
          <Input.TextArea showCount maxLength={200} style={{ height: 150 }} />
        </Form.Item>

        <Form.Item valuePropName='checked' name='is_private' label='Private'>
          <Switch checkedChildren='Yes' unCheckedChildren='No' />
        </Form.Item>
      </Form>
    </Modal>
  );
};
