import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import { SearchFieldContainer as SearchField } from "../components/SearchField";
import PopupFilter from "../components/PopupFilter";
import { RangeSliderContainer as RangeSlider } from "../components/RangeSlider";
import { CategoryContainer as Categories } from "../components/Categories";
import { LegendContainer as Legend } from "../components/Legend";
import { GridContainer as Grid } from "../components/Grid";
import { ViewContainer as Viewer } from "../components/Viewer";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/pages/GridPage.module.scss";

export default function GridPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Grid</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        toolbar={
          <div className={styles.toolbar}>
            <div className={styles.filters}>
              <section className={styles.empty} />
              <section className={styles.searchField}>
                <SearchField />
              </section>
              <section className={styles.popupFilter}>
                <PopupFilter>
                  <Typography>Date range</Typography>
                  <RangeSlider base={true} />
                  <Typography>Categories</Typography>
                  <Categories />
                </PopupFilter>
              </section>
            </div>
            <Legend />
          </div>
        }
      >
        <Grid />
        <Viewer fullScreen imageSize="m" />
      </Layout>
    </React.Fragment>
  );
}
