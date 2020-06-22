import Layout from "../components/Layout";
import { RangeSliderContainer as RangeSlider } from "../components/RangeSlider";
import PopupFilter from "../components/PopupFilter";
import { LineHeightSliderContainer as LineHeightSlider } from "../components/LineHeightSlider";
import { CategoryContainer as Categories } from "../components/Categories";
import { LegendContainer as Legend } from "../components/Legend";
import { TimelineContainer as Timeline } from "../components/TimeLine";
import { ViewContainer as Viewer } from "../components/Viewer";
import Typography from "@material-ui/core/Typography";
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
        <Timeline />
        <Viewer />
      </div>
    </Layout>
  );
}
