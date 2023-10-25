import React from 'react';
import { Tooltip, message } from 'antd';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../../api/axios';
import axios from 'axios';

import styles from './Auth.module.css';

const REGISTER_URL = '/auth/register';

type User = {
  username: string;
  email: string;
  password: string;
};

function filterObject(obj: User) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, val]) => val !== '')
  );
}

export const Register: React.FC = () => {
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

  const onSubmit = async (data: User) => {
    try {
      await api.post(REGISTER_URL, filterObject(data));
      message.success('Account created', 5);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        message.error('Username registered', 5);
      } else {
        message.error('Registration failed', 5);
      }
    }
  };

  return (
    <div className={styles.auth_form}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_group}>
          <Tooltip
            title={errors?.username?.message}
            open={errors?.username && true}
          >
            <input
              {...register('username', {
                required: { value: true, message: 'Required field' },
                minLength: { value: 4, message: 'Min length is 4 characters' },
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
                minLength: { value: 4, message: 'Min length is 4 characters' },
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

        <input type='submit' value='Register' />

        <div className={styles.form_link}>
          Have account? <Link to='/login'>Login</Link>
        </div>
      </form>
    </div>
  );
};
