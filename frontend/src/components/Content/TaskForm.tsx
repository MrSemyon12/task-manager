import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, Form, Input, message, DatePicker, Select } from 'antd';

import { BASE_TASKS_URL } from '../../api/urls';
import { useApiPrivate, useProject } from '../../hooks';

type TaskFormProps = {
  open: boolean;
  closeForm: Function;
  state: {
    id: number;
    title: string;
  };
  setBoards: Dispatch<SetStateAction<any>>;
};

type TaskCreate = {
  title: string;
  description: string;
  deadline: string;
};

export const TaskForm: React.FC<TaskFormProps> = ({
  open,
  closeForm,
  state,
  setBoards,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [priorityId, setPriorityId] = useState(3);
  const { curProject } = useProject();
  const api = useApiPrivate();
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    closeForm();
  };

  const handleSubmit = async (data: TaskCreate) => {
    if (!curProject) return;

    const newData = {
      task_create: {
        title: data.title,
        description: data.description,
        deadline: data.deadline,
      },
      priority_id: priorityId,
      state_id: state.id,
    };

    setConfirmLoading(true);

    try {
      const response = await api.post(
        BASE_TASKS_URL.replace(':id', curProject.id.toString()),
        newData
      );
      setBoards((prev: any) => {
        const newBorads = { ...prev };
        newBorads[state.title.toLowerCase()].push(response.data);
        return newBorads;
      });
      message.success('Task created', 5);
      closeForm();
    } catch (error) {
      message.error('Service is not available', 5);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title='Create task'
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
        name={`task_form_${state.id}`}
        onFinish={handleSubmit}
        style={{ marginTop: 30 }}
        initialValues={{
          title: '',
          description: '',
          deadline: '',
        }}
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

        <Form.Item
          name='description'
          label='Description'
          rules={[
            {
              required: true,
              message: 'Please fill in description',
            },
          ]}
        >
          <Input.TextArea showCount maxLength={200} style={{ height: 150 }} />
        </Form.Item>

        <Form.Item
          name='deadline'
          label='Deadline'
          rules={[
            {
              required: true,
              message: 'Please fill in deadline',
            },
          ]}
        >
          <DatePicker
            disabledDate={(current) =>
              current && current.valueOf() < Date.now()
            }
          />
        </Form.Item>

        <Form.Item label='Priority'>
          <Select
            defaultValue='low'
            style={{ width: 100 }}
            options={[
              { value: 3, label: 'low' },
              { value: 2, label: 'medium' },
              { value: 1, label: 'high' },
            ]}
            onChange={(value) => setPriorityId(+value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
