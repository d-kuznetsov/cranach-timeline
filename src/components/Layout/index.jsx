import PropTypes from "prop-types";
import styles from "./Layout.module.scss";
import { NavigationContainer as Navigation } from "../Navigation";
import { ThemeProvider } from "@material-ui/styles";
import createTheme from "../../lib/createTheme";

const theme = createTheme();

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <header className={styles.header}>
          <section className={styles.headerContent}>
            <Navigation />
          </section>
        </header>
        <main className={styles.main}>
          <section className={styles.mainContent}>{children}</section>
        </main>
        <footer className={styles.footer}>
          <section className={styles.footerContent}></section>
        </footer>
      </div>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.element,
};
