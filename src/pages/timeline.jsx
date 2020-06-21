import Layout from "../components/Layout";
import { RangeSliderContainer as RangeSlider } from "../components/RangeSlider";
import PopupFilter from "../components/PopupFilter";
import { LegendContainer as Legend } from "../components/Legend";
import { TimelineContainer as Timeline } from "../components/TimeLine";
import { ViewContainer as Viewer } from "../components/Viewer";
import styles from "../styles/pages/TimelinePage.module.scss";

export default function TimelinePage() {
  return (
    <Layout
      toolbar={
        <div className={styles.toolbar}>
          <div className={styles.filters}>
            <section className={styles.rangeSlider}>
              <RangeSlider />
            </section>
            <section className={styles.popupFilter}>
              <PopupFilter />
            </section>
          </div>
          <Legend />
        </div>
      }
    >
      <div className={styles.timelineContainer}>
        <Timeline />
        <Viewer />
      </div>
    </Layout>
  );
}
