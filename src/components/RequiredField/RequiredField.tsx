import styles from './RequiredField.module.scss';

export function RequiredField() {
  return <span className={styles.required}>*</span>;
}
