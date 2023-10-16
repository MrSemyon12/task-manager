import styles from './Header.module.css';

import { Container } from '../Container';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.wrapper}>
          <h1>Task Manager</h1>
        </div>
      </Container>
    </header>
  );
};
