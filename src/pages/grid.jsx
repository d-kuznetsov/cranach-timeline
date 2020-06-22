import Layout from "../components/Layout";
import { SearchFieldContainer as SearchField } from "../components/SearchField";
import PopupFilter from "../components/PopupFilter";
import { RangeSliderContainer as RangeSlider } from "../components/RangeSlider";
import { CategoryContainer as Categories } from "../components/Categories";
import { LegendContainer as Legend } from "../components/Legend";
import { GridContainer as Grid } from "../components/Grid";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/pages/GridPage.module.scss";

export default function GridPage() {
  return (
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
    </Layout>
  );
}
