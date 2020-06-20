import { useSelector } from "react-redux";

import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import styles from "./Legend.module.scss";

export function LegendContainer() {
  const { categories, period } = useSelector((state) => state);
  return <LegendComponent categories={categories} period={period} />;
}

export function LegendComponent({ categories, period }) {
  const [start, end] = period;
  console.log(categories);
  return (
    <div className={styles.container}>
      <section className={styles.categories}>
        {Object.keys(categories).map((key) => {
          const { id, mainColor, label } = categories[key];
          return (
            <div key={id} className={styles.category}>
              <div className={styles.categoryColor} style={{ backgroundColor: mainColor }}></div>
              <div className={styles.categoryLabel}>{label}</div>
            </div>
          );
        })}
      </section>
      <section className={styles.period}>
        {start} - {end}
      </section>
    </div>
  );
}

LegendComponent.propTypes = {
  categories: PropTypes.object,
  period: PropTypes.array,
};

/*
      <TextField
        label="start"
        variant="outlined"
        size="small"
        type="number"
        defaultValue={2000}
        margin="none"
        inputProps={{ max: 2000, maxLength: 4 }}
      />
      <TextField label="end" variant="outlined" size="small" type="number" defaultValue={2020} />
*/
