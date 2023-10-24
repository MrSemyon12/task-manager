import React, { ReactNode } from 'react';
import styles from './Container.module.css';

type ChildrenProps = { children?: ReactNode };

export const Container: React.FC<ChildrenProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
