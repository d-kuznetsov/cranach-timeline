import { useSelector } from "react-redux";

import DateRangeIcon from "@material-ui/icons/DateRange";
import CategoryIcon from "@material-ui/icons/Category";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./Legend.module.scss";
import { RootState, Categories, Period, ColorPalette, ColorShade } from "../../redux/types";

export function LegendContainer() {
  const { categories, period, textToSearch, artworksToView, colorPalette } = useSelector(
    (state: RootState) => state
  );
  return (
    <LegendComponent
      categories={categories}
      period={period}
      searchText={textToSearch}
      itemNumber={artworksToView.length}
      colorPalette={colorPalette}
    />
  );
}

interface Props {
  categories: Categories;
  period: Period;
  searchText: string;
  itemNumber: number;
  colorPalette: ColorPalette;
}

export function LegendComponent({
  categories,
  period,
  searchText,
  itemNumber,
  colorPalette,
}: Props) {
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
            {Object.values(categories).map(({ id, mainColor, label, displayed }) => {
              if (!displayed) {
                return null;
              }
              const bgColor = colorPalette.primary[mainColor as ColorShade];
              return (
                <div key={id} className={styles.category}>
                  <div className={styles.categoryColor} style={{ backgroundColor: bgColor }}></div>
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
