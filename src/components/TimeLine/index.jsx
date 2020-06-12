import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "./TimeLine.module.scss";
import { CATEGORIES } from "../../constants";

export function TimelineContainer() {
  const { period, artworksToView } = useSelector((state) => state);
  return <TimelineComponent period={period} items={artworksToView} />;
}

const OFFSET = 10;

function getItemsByYear(items) {
  const itemsByYear = {};
  items.forEach((item) => {
    if (!itemsByYear[item.dating.begin]) {
      itemsByYear[item.dating.begin] = [];
    }
    itemsByYear[item.dating.begin].push(item);
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
    let year = item.dating.begin;
    while (true) {
      if (matrix[year][offsetFactor]) {
        offsetFactor++;
        year = item.dating.begin;
      } else {
        year++;
      }
      if (year > item.dating.end) {
        if (offsetFactor > maxOffsetFactor) {
          maxOffsetFactor = offsetFactor;
        }
        break;
      }
    }
    for (let year = item.dating.begin; year <= item.dating.end; year++) {
      matrix[year][offsetFactor] = true;
    }
    return {
      ...item,
      offsetFactor,
      periodLength: item.dating.end - item.dating.begin + 1,
    };
  });

  return {
    modifiedItems,
    maxOffsetFactor,
  };
}

export function TimelineComponent({ period, items }) {
  const yearList = getYearList(period);
  const { modifiedItems, maxOffsetFactor } = withAdditionalProps(yearList, items);
  const itemsByYear = getItemsByYear(modifiedItems);
  console.log(itemsByYear);
  return (
    <div className={styles.container}>
      <div className={styles.displayArea} style={{ height: OFFSET * (maxOffsetFactor + 1) }}>
        {yearList.map((year) => (
          <div key={year} data-year={year} className={styles.year}>
            {!itemsByYear[year]
              ? null
              : itemsByYear[year]
                  .filter((item) => item.periodLength)
                  .map(({ offsetFactor, periodLength, categoryId, images, dating }) => (
                    <Tooltip
                      key={offsetFactor}
                      enterDelay={1000}
                      enterNextDelay={1000}
                      title={
                        <div>
                          <img src={images.sizes.xs.src} alt={"d"} />
                          <div>{`${dating.begin}-${dating.end}`}</div>
                        </div>
                      }
                    >
                      <div
                        data-key={offsetFactor}
                        className={styles.item}
                        style={{
                          marginLeft: "1px",
                          bottom: `${OFFSET * offsetFactor}px`,
                          width: `calc(${100 * periodLength}% - 2px)`,
                          backgroundColor: CATEGORIES[categoryId].mainColor,
                        }}
                      ></div>
                    </Tooltip>
                  ))}
          </div>
        ))}
      </div>
    </div>
  );
}

TimelineComponent.propTypes = {
  period: PropTypes.array,
  items: PropTypes.array,
};
