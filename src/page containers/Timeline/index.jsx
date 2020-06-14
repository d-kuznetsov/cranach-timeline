import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadArtworks } from "../../redux/actions";

import Layout from "../../components/Layout";
import { CategoryContainer as Categories } from "../../components/Categories";
import { TimelineContainer as TimelineView } from "../../components/TimeLine";
import { RangeSliderContainer as RangeSlider } from "../../components/RangeSlider";
import { LineHeightSliderContainer as LineHeightSlider } from "../../components/LineHeightSlider";
import styles from "./Timeline.module.scss";

export default function Timeline() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadArtworks());
  }, [0]);

  return (
    <Layout>
      <div className={styles.container}>
        <section className={styles.header}>
          <section className={styles.categoriesWrapper}>
            <Categories />
          </section>
          <section className={styles.lineHeightSliderWrapper}>
            <LineHeightSlider />
          </section>
        </section>
        <section className={styles.view}>
          <TimelineView />
        </section>
        <section className={styles.slider}>
          <RangeSlider />
        </section>
      </div>
    </Layout>
  );
}
