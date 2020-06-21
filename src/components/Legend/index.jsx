import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import styles from "./Legend.module.scss";

export function LegendContainer() {
  const { categories, period } = useSelector((state) => state);
  return <LegendComponent categories={categories} period={period} />;
}

export function LegendComponent({ categories, period }) {
  const [start, end] = period;
  return (
    <div className={styles.container}>
      <section className={styles.categories}>
        {Object.keys(categories).map((key) => {
          const { id, mainColor, label } = categories[key];
          return (
            <div key={id} className={styles.category}>
              <div className={styles.categoryColor} style={{ backgroundColor: mainColor }}></div>
              <Typography>{label}</Typography>
            </div>
          );
        })}
      </section>
      <section className={styles.period}>
        <Typography>
          {start} - {end}
        </Typography>
      </section>
    </div>
  );
}

LegendComponent.propTypes = {
  categories: PropTypes.object,
  period: PropTypes.array,
};
