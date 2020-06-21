import Layout from "../components/Layout";
import { RangeSliderContainer as RangeSlider } from "../components/RangeSlider";
import ExpansionPanel from "../components/ExpansionPanel";
import { CategoryContainer as Categories } from "../components/Categories";
import { LineHeightSliderContainer as LineHeightSlider } from "../components/LineHeightSlider";
import { LegendContainer as Legend } from "../components/Legend";
import { TimelineContainer as Timeline } from "../components/TimeLine";
import { ViewContainer as Viewer } from "../components/Viewer";
import styles from "../styles/pages/TimelinePage.module.scss";

export default function TimelinePage() {
  return (
    <Layout
      toolbar={
        <div>
          <ExpansionPanel summary={<RangeSlider />}>
            <section className={styles.expansionPanel}>
              <section className={styles.categories}>
                <Categories />
              </section>
              <section className={styles.lineHeightSlider}>
                <LineHeightSlider />
              </section>
            </section>
          </ExpansionPanel>
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
