import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './Auth.module.css';

export const Register: React.FC = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = async () => {};

  return (
    <div className={styles.auth_form}>
      <h1>Register</h1>
      <form>
        <div className={styles.form_group}>
          <input type='text' placeholder='' />
          <span></span>
          <label>Username</label>
        </div>
        <div className={styles.form_group}>
          <input type='email' placeholder='' />
          <span></span>
          <label>Email</label>
        </div>
        <div className={styles.form_group}>
          <input type='password' placeholder='' />
          <span></span>
          <label>Password</label>
        </div>
        <div className={styles.form_group}>
          <input type='password' placeholder='' />
          <span></span>
          <label>Confirm password</label>
        </div>
        <input type='submit' value='Register' />
        <div className={styles.form_link}>
          Have account? <Link to='/login'>Login</Link>
        </div>
      </form>
    </div>
  );
};
