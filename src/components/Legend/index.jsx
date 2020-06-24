import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CategoryIcon from "@material-ui/icons/Category";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./Legend.module.scss";

export function LegendContainer() {
  const { categories, period, textToSearch, artworksToView } = useSelector((state) => state);
  return (
    <LegendComponent
      categories={categories}
      period={period}
      searchText={textToSearch}
      itemNumber={artworksToView.length}
    />
  );
}

export function LegendComponent({ categories, period, searchText, itemNumber }) {
  const [start, end] = period;
  return (
    <div className={styles.container}>
      <section className={styles.results}>{itemNumber} results for</section>
      <section className={styles.filters}>
        <section className={styles.period}>
          <DateRangeIcon color="secondary" className={styles.periodIcon} />
          <div className={styles.periodContent}>
            {start}-{end}
          </div>
        </section>
        <section className={styles.categories}>
          <CategoryIcon color="secondary" className={styles.categoriesIcon} />
          <div className={styles.categoriesContent}>
            {Object.keys(categories).map((key) => {
              const { id, mainColor, label, displayed } = categories[key];
              if (!displayed) {
                return null;
              }
              return (
                <div key={id} className={styles.category}>
                  <div
                    className={styles.categoryColor}
                    style={{ backgroundColor: mainColor }}
                  ></div>
                  <div className={styles.categoryLabel}>{label}</div>
                </div>
              );
            })}
          </div>
        </section>
        {searchText && (
          <section className={styles.search}>
            <SearchIcon color="secondary" className={styles.searchIcon} />
            <div className={styles.searchContent}>{searchText}</div>
          </section>
        )}
      </section>
    </div>
  );
}

LegendComponent.propTypes = {
  categories: PropTypes.object,
  period: PropTypes.array,
  searchText: PropTypes.string,
  itemNumber: PropTypes.number,
};
