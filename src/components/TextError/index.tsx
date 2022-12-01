import styles from './TextError.module.scss';

export function TextError({ children }: { children: React.ReactNode }) {
  return <span className={styles.error}>{children}</span>;
}
