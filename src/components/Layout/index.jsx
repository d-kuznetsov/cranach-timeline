import styles from "./Layout.module.scss";

export default function Layout() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <section className={styles.headerContent}>h</section>
      </header>
      <main className={styles.main}>
        <section className={styles.mainContent}>m</section>
      </main>
      <footer className={styles.footer}>
        <section className={styles.footerContent}>f</section>
      </footer>
    </div>
  );
}
