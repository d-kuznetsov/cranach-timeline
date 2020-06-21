import Layout from "../components/Layout";
import PopupFilter from "../components/PopupFilter";
import { RangeSliderContainer as RangeSlider } from "../components/RangeSlider";
import { LegendContainer as Legend } from "../components/Legend";
import { GridContainer as Grid } from "../components/Grid";
import styles from "../styles/pages/GridPage.module.scss";

export default function GridPage() {
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
      <Grid />
    </Layout>
  );
}
