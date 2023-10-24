import React, { ReactNode } from 'react';
import styles from './Center.module.css';

type ChildrenProps = { children?: ReactNode };

export const Center: React.FC<ChildrenProps> = ({ children }) => {
  return <section className={styles.center}>{children}</section>;
};
