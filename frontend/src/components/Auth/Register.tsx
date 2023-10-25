import React from 'react';
import { Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './Auth.module.css';

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

  type User = {
    username: string;
    email: string;
    password: string;
  };

  const onSubmit = async (data: User) => {
    console.log(data);
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
