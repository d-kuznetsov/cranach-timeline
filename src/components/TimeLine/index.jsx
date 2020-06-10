import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "./TimeLine.module.scss";
import { CATEGORIES } from "../../constants";

const OFFSET = 20;

function getItemsByYear(items) {
  const itemsByYear = {};
  items.forEach((item) => {
    if (!itemsByYear[item.start]) {
      itemsByYear[item.start] = [];
    }
    itemsByYear[item.start].push(item);
  });
  return itemsByYear;
}

function getYearList(period) {
  const list = [];
  const [start, end] = period;
  for (let year = start; year <= end; year++) {
    list.push(year);
  }
  return list;
}

function withAdditionalProps(yearList, items) {
  let matrix = {};
  let maxOffsetFactor = 0;
  yearList.forEach((year) => (matrix[year] = new Array(items.length).fill(false)));
  const modifiedItems = items.map((item) => {
    let offsetFactor = 0;
    let year = item.start;
    while (true) {
      if (matrix[year][offsetFactor]) {
        offsetFactor++;
        year = item.start;
      } else {
        year++;
      }
      if (year > item.end) {
        if (offsetFactor > maxOffsetFactor) {
          maxOffsetFactor = offsetFactor;
        }
        break;
      }
    }
    for (let year = item.start; year <= item.end; year++) {
      matrix[year][offsetFactor] = true;
    }
    return {
      ...item,
      offsetFactor,
      periodLength: item.end - item.start + 1,
    };
  });

  return {
    modifiedItems,
    maxOffsetFactor,
  };
}

export function PresentationalComponent({ period, items }) {
  const yearList = getYearList(period);
  const { modifiedItems, maxOffsetFactor } = withAdditionalProps(yearList, items);
  const itemsByYear = getItemsByYear(modifiedItems);
  return (
    <div className={styles.container}>
      <div className={styles.displayArea} style={{ height: OFFSET * (maxOffsetFactor + 1) }}>
        {yearList.map((year) => (
          <div key={year} className={styles.year}>
            {!itemsByYear[year]
              ? null
              : itemsByYear[year].map(
                  ({ offsetFactor, periodLength, category, imgL, description }) => (
                    <Tooltip
                      key={offsetFactor}
                      enterDelay={1000}
                      enterNextDelay={1000}
                      title={<img src={imgL} alt={description} />}
                    >
                      <div
                        className={styles.item}
                        style={{
                          bottom: `${OFFSET * offsetFactor}px`,
                          width: `${100 * periodLength}%`,
                          backgroundColor: CATEGORIES[category].mainColor,
                        }}
                      ></div>
                    </Tooltip>
                  )
                )}
          </div>
        ))}
      </div>
    </div>
  );
}

PresentationalComponent.propTypes = {
  period: PropTypes.array,
  items: PropTypes.array,
};

export default function TimeLine() {
  const { period, artworksToView } = useSelector((state) => {
    const { period, artworksToView } = state;
    return {
      period,
      artworksToView,
    };
  });
  return <PresentationalComponent period={period} items={artworksToView} />;
}
