import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/types";
import { setTextToSearch } from "../redux/actions";
import React, { useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import { RangeSliderContainer as RangeSlider } from "../components/RangeSlider";
import PopupFilter from "../components/PopupFilter";
import { LineHeightSliderContainer as LineHeightSlider } from "../components/LineHeightSlider";
import { CategoryContainer as Categories } from "../components/Categories";
import { LegendContainer as Legend } from "../components/Legend";
import { HeadersByYearContainer as HeadersByYear } from "../components/HeadersByYear";
import { TimelineContainer as Timeline } from "../components/TimeLine";
import { ViewContainer as Viewer } from "../components/Viewer";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/pages/TimelinePage.module.scss";

export default function TimelinePage() {
  const { textToSearch } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    textToSearch && dispatch(setTextToSearch(""));
  }, [0]);

  return (
    <React.Fragment>
      <Head>
        <title>Timeline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        toolbar={
          <div className={styles.toolbar}>
            <div className={styles.filters}>
              <section className={styles.rangeSlider}>
                <RangeSlider />
              </section>
              <section className={styles.popupFilter}>
                <PopupFilter>
                  <Typography>Line height</Typography>
                  <LineHeightSlider />
                  <Typography>Categories</Typography>
                  <Categories />
                </PopupFilter>
              </section>
            </div>
            <Legend />
          </div>
        }
      >
        <div className={styles.timelineContainer}>
          <HeadersByYear />
          <Timeline />
          <Viewer />
        </div>
      </Layout>
    </React.Fragment>
  );
}
