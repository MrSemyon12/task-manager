import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Switch, Tooltip } from 'antd';

import styles from './CreationForm.module.css';

type ProjectFormProps = {
  open: boolean;
  closeForm: Function;
};

type ProjectCreate = {
  title: string;
  description: string;
  isPrivate: boolean;
};

export const ProjectForm: React.FC<ProjectFormProps> = ({
  open,
  closeForm,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      isPrivate: false,
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: ProjectCreate) => {
    setConfirmLoading(true);
    console.log(data);
    setTimeout(() => {
      closeForm();
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <Modal
      title='Create project'
      open={open}
      onOk={handleSubmit(onSubmit)}
      confirmLoading={confirmLoading}
      onCancel={() => closeForm()}
    >
      <div className={styles.form_group}>
        <label>Title:</label>
        <Tooltip title={errors?.title?.message} open={errors?.title && true}>
          <input
            {...register('title', {
              required: { value: true, message: 'Required field' },
            })}
          />
        </Tooltip>
      </div>

      <div className={styles.form_group}>
        <label>Description:</label>
        <Tooltip
          title={errors?.description?.message}
          open={errors?.description && !errors?.title}
        >
          <textarea
            {...register('description', {
              required: { value: true, message: 'Required field' },
            })}
          />
        </Tooltip>
      </div>

      <div className={styles.form_group}>
        <label>Private:</label>
        <Switch />
      </div>
    </Modal>
  );
};
