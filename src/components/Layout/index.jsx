import styles from "./Layout.module.scss";
import Navigation from "../Navigation";
import { ThemeProvider } from "@material-ui/styles";
import createTheme from "../../lib/createTheme";

const theme = createTheme();

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <header className={styles.header}>
          <section className={styles.headerContent}>
            <Navigation />
          </section>
        </header>
        <main className={styles.main}>
          <section className={styles.mainContent}>m</section>
        </main>
        <footer className={styles.footer}>
          <section className={styles.footerContent}>f</section>
        </footer>
      </div>
    </ThemeProvider>
  );
}
