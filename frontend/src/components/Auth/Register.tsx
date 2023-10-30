import React, { useState } from 'react';
import { Tooltip, message } from 'antd';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { UserRegister } from './types';
import api from '../../api/axios';

import styles from './Auth.module.css';

const REGISTER_URL = '/auth/register';

function filterObject(obj: UserRegister) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, val]) => val !== '')
  );
}

export const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: UserRegister) => {
    setIsLoading(true);
    messageApi.open({
      type: 'loading',
      content: 'Pending result...',
      duration: 0,
    });
    try {
      await api.post(REGISTER_URL, filterObject(data));
      messageApi.destroy();
      message.success('Account created', 5);
    } catch (error) {
      messageApi.destroy();
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        message.error(`Username \"${data.username}\" already exists`, 5);
      } else {
        message.error('Service is not available', 5);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.auth_form}>
      <h1>Register</h1>
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_group}>
          <Tooltip
            title={errors?.username?.message}
            open={errors?.username && true}
          >
            <input
              {...register('username', {
                required: { value: true, message: 'Required field' },
                minLength: {
                  value: 4,
                  message: 'Min length is 4 characters',
                },
                maxLength: {
                  value: 16,
                  message: 'Max length is 16 characters',
                },
              })}
              type='text'
              placeholder=''
            />
          </Tooltip>
          <span></span>
          <label>Username</label>
        </div>

        <div className={styles.form_group}>
          <Tooltip
            title={errors?.email?.message}
            open={errors?.email && !errors?.username}
          >
            <input
              {...register('email', {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Not email format',
                },
              })}
              type='text'
              placeholder=''
            />
          </Tooltip>
          <span></span>
          <label>Email</label>
        </div>

        <div className={styles.form_group}>
          <Tooltip
            title={errors?.password?.message}
            open={errors?.password && !errors?.username && !errors?.email}
          >
            <input
              {...register('password', {
                required: { value: true, message: 'Required field' },
                minLength: {
                  value: 4,
                  message: 'Min length is 4 characters',
                },
                maxLength: {
                  value: 16,
                  message: 'Max length is 16 characters',
                },
              })}
              type='password'
              placeholder=''
            />
          </Tooltip>
          <span></span>
          <label>Password</label>
        </div>

        <input type='submit' value='Register' disabled={isLoading} />

        <div className={styles.form_link}>
          Have account? <Link to='/login'>Login</Link>
        </div>
      </form>
    </div>
  );
};
