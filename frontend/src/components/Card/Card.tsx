import React, { ReactNode } from 'react';

import styles from './Card.module.css';

type ChildrenProps = { children?: ReactNode };

export const Card: React.FC<ChildrenProps> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};
