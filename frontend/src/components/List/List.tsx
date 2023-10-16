import styles from './List.module.css';

import { ReactNode } from 'react';

type ChildrenProps = { children?: ReactNode };

export const List: React.FC<ChildrenProps> = ({ children }) => {
  return <section className={styles.wrapper}>{children}</section>;
};
