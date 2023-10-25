import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './Auth.module.css';

export const Login: React.FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = async () => {};

  return (
    <div className={styles.auth_form}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_group}>
          <input type='text' placeholder='' />
          <span></span>
          <label>Username</label>
        </div>
        <div className={styles.form_group}>
          <input type='password' placeholder='' />
          <span></span>
          <label>Password</label>
        </div>
        <input type='submit' value='Login' />
        <div className={styles.form_link}>
          Haven't account? <Link to='/register'>Register</Link>
        </div>
      </form>
    </div>
  );
};
