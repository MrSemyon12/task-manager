import React from 'react';
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
          <input type='text' />
          <label>Username</label>
        </div>
        <div className={styles.form_group}>
          <input type='text' />
          <label>Password</label>
        </div>
        <div className={styles.form_group}>
          <input type='text' />
          <label>Confirm password</label>
        </div>
      </form>
    </div>
  );
};
