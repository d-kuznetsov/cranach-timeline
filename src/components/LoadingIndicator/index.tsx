import styles from "./LoadingIndicator.module.scss";

export default function LoadingIndicator() {
  return (
    <div className={styles.container}>
      <div className={styles.indicator}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
