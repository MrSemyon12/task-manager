import React, { useState } from 'react';
import { Modal, Form, Input, message, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';

import { UPDATE_TASKS_INFO_URL } from '../../api/urls';
import { useApiPrivate, useProject, useBoard } from '../../hooks';
import { Task } from '../../types';

type TaskFormProps = {
  open: boolean;
  closeForm: Function;
  task: Task;
};

type TaskCreate = {
  title: string;
  description: string;
  deadline: string;
};

export const TaskFormUpdate: React.FC<TaskFormProps> = ({
  open,
  closeForm,
  task,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [priorityId, setPriorityId] = useState(task.priority.id);
  const { curProject } = useProject();
  const { setBoard } = useBoard();
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
      task_update: {
        title: data.title,
        description: data.description,
        deadline: data.deadline,
      },
      priority_id: priorityId,
    };
    setConfirmLoading(true);
    try {
      const response = await api.patch(
        UPDATE_TASKS_INFO_URL.replace(
          ':projectId',
          curProject.project.id.toString()
        ).replace(':taskId', task.id.toString()),
        newData
      );
      setBoard((prev: any) => {
        const newBorad = { ...prev };
        const idx = newBorad[task.state.title].findIndex(
          (el: Task) => el.id === task.id
        );
        newBorad[task.state.title][idx] = response.data;
        return newBorad;
      });
      message.success('Successful update', 2);
      closeForm();
    } catch (error) {
      message.error('Service is not available', 5);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title='Update task'
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        form={form}
        name={`task_form_${task.state.id}`}
        onFinish={handleSubmit}
        style={{ marginTop: 30 }}
        initialValues={{
          title: task.title,
          description: task.description,
          deadline: dayjs(task.deadline, 'YYYY-MM-DD'),
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
              max: 24,
              message: 'Max length is 24 characters',
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
            defaultValue={task.priority.title}
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
