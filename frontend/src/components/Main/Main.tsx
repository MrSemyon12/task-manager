import styles from './Main.module.css';

import { ReactNode } from 'react';

import { Container } from '../Container';

type ChildrenProps = { children?: ReactNode };

export const Main: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <main className={styles.wrapper}>
      <Container>{children}</Container>
    </main>
  );
};
