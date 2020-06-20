import Layout from "../components/Layout";
import { RangeSliderContainer as RangeSlider } from "../components/RangeSlider";
import { LegendContainer as Legend } from "../components/Legend";
import { TimelineContainer as Timeline } from "../components/TimeLine";
import styles from "../styles/pages/TimelinePage.module.scss";

export default function TimelinePage() {
  return (
    <Layout
      toolbar={
        <div>
          <RangeSlider />
          <Legend />
        </div>
      }
    >
      <div className={styles.timelineContainer}>
        <Timeline />
      </div>
    </Layout>
  );
}
