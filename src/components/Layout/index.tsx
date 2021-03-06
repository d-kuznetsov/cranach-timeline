import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { loadArtworks } from "../../redux/actions";
import { RootState } from "../../redux/types";

import { ThemeProvider } from "@material-ui/styles";
import createTheme from "../../lib/createTheme";
import { NavigationContainer as Navigation } from "../Navigation";
import LoadingIndicator from "../LoadingIndicator";
import Settings from "../Settings";
import styles from "./Layout.module.scss";

interface Props {
  children: React.ReactNode;
  toolbar?: React.ReactNode;
  heightLimit?: boolean;
}

export default function Layout({ children, toolbar, heightLimit = true }: Props) {
  const { artworks, isLoading, colorPalette } = useSelector((state: RootState) => state);
  const theme = useMemo(() => createTheme(colorPalette), [colorPalette]);
  const dispatch = useDispatch();
  useEffect(() => {
    !artworks.length && dispatch(loadArtworks());
  }, [0]);

  return (
    <ThemeProvider theme={theme}>
      {isLoading && <LoadingIndicator />}
      <div className={styles.container}>
        <header className={styles.header}>
          <section className={styles.headerContent}>
            <Settings />
            <Navigation />
          </section>
        </header>
        <main className={`${styles.main} ${heightLimit ? styles.main__heightLimit : ""}`}>
          {toolbar && <section className={styles.toolbar}>{toolbar}</section>}
          <section
            className={`${styles.mainContent} ${
              heightLimit ? styles.mainContent__heightLimit : ""
            }`}
          >
            {children}
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}
