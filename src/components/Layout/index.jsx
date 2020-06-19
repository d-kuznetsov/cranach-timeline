import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadArtworks } from "../../redux/actions";

import PropTypes from "prop-types";
import styles from "./Layout.module.scss";
import { NavigationContainer as Navigation } from "../Navigation";
import { ThemeProvider } from "@material-ui/styles";
import createTheme from "../../lib/createTheme";

const theme = createTheme();
export default function Layout({ children, toolbar }) {
  const artworks = useSelector((state) => state.artworks);
  const dispatch = useDispatch();
  useEffect(() => {
    !artworks.length && dispatch(loadArtworks());
  }, [0]);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <header className={styles.header}>
          <section className={styles.headerContent}>
            <Navigation />
          </section>
        </header>
        <main className={styles.main}>
          {toolbar && <section className={styles.toolbar}>{toolbar}</section>}
          <section className={styles.mainContent}>{children}</section>
        </main>
      </div>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.element,
  toolbar: PropTypes.element,
};
