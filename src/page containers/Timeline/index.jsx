import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadArtworks } from "../../redux/actions";

import Layout from "../../components/Layout";
import { CategoryContainer as Categories } from "../../components/Categories";
import { TimelineContainer as TimelineView } from "../../components/TimeLine";
import { RangeSliderContainer as RangeSlider } from "../../components/RangeSlider";
import styles from "./Timeline.module.scss";

export default function Timeline() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadArtworks());
  }, [0]);

  return (
    <Layout>
      <div className={styles.container}>
        <section className={styles.categories}>
          <Categories />
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
