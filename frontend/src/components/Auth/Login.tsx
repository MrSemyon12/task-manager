import React, { useState } from 'react';
import { Tooltip, message } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { LOGIN_URL } from '../../api/urls';
import { useAuth } from '../../hooks';
import { UserLogin } from './types';
import api from '../../api/axios';

import styles from './Auth.module.css';

export const Login: React.FC = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: UserLogin) => {
    setIsLoading(true);
    messageApi.open({
      type: 'loading',
      content: 'Pending result...',
      duration: 0,
    });
    try {
      const response = await api.post(LOGIN_URL, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true,
      });
      setAuth(response.data);
      messageApi.destroy();
      message.success('Successful login', 5);
      navigate(from, { replace: true });
    } catch (error) {
      messageApi.destroy();
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        message.error('Incorrect username or password', 5);
      } else {
        message.error('Service is not available', 5);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.auth_form}>
      <h1>Login</h1>
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
            title={errors?.password?.message}
            open={errors?.password && !errors?.username}
          >
            <input
              {...register('password', {
                required: { value: true, message: 'Required field' },
              })}
              type='password'
              placeholder=''
            />
          </Tooltip>
          <span></span>
          <label>Password</label>
        </div>

        <input type='submit' value='Login' disabled={isLoading} />

        <div className={styles.form_link}>
          Haven't account? <Link to='/register'>Register</Link>
        </div>
      </form>
    </section>
  );
};
