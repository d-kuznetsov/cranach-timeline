import Layout from "../components/Layout";
import { RangeSliderContainer as RangeSlider } from "../components/RangeSlider";
import { TimelineContainer as Timeline } from "../components/TimeLine";
import styles from "../styles/pages/TimelinePage.module.scss";

export default function TimelinePage() {
  return (
    <Layout
      toolbar={
        <div>
          <RangeSlider />
        </div>
      }
    >
      <div className={styles.timelineContainer}>
        <Timeline />
      </div>
    </Layout>
  );
}
