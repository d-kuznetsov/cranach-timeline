import { useSelector, useDispatch } from "react-redux";
import { setArtworkToView } from "../../redux/actions";

import PropTypes from "prop-types";
import styles from "./TimeLine.module.scss";
import { getArtworkTitle, getPeriod } from "../../lib/extractArtworkData";
import { CATEGORIES } from "../../constants";

export function TimelineContainer() {
  const { period, artworksToView, lineHeight } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleLineClick = (artwork) => {
    dispatch(setArtworkToView(artwork));
  };
  return (
    <TimelineComponent
      period={period}
      items={artworksToView}
      lineHeight={lineHeight}
      onLineClick={handleLineClick}
    />
  );
}

export function TimelineComponent({ period, items, lineHeight = 16, onLineClick }) {
  const yearList = getYearList(period);
  const { modifiedItems, maxOffsetFactor } = withAdditionalProps(yearList, items);
  const itemsByYear = getItemsByYear(modifiedItems);
  const offset = lineHeight * 1.25;
  return (
    <div className={styles.container} style={{ height: offset * (maxOffsetFactor + 1) }}>
      {yearList.map((year) => (
        <div key={year} data-year={year} className={styles.year}>
          {!itemsByYear[year]
            ? null
            : itemsByYear[year]
                .filter((item) => item.periodLength)
                .map((artwork) => {
                  return (
                    <ArtworkLine
                      key={artwork.offsetFactor}
                      artworkData={artwork}
                      offset={offset}
                      lineHeight={lineHeight}
                      onClick={onLineClick}
                    />
                  );
                })}
        </div>
      ))}
    </div>
  );
}

TimelineComponent.propTypes = {
  period: PropTypes.array,
  items: PropTypes.array,
  lineHeight: PropTypes.number,
  onLineClick: PropTypes.func,
};

function ArtworkLine({ artworkData, offset, lineHeight, onClick }) {
  const { offsetFactor, periodLength, categoryId } = artworkData;
  const handleClick = () => {
    onClick(artworkData);
  };
  return (
    <div
      title={`${getArtworkTitle(artworkData)} | ${getPeriod(artworkData)}`}
      className={styles.item}
      style={{
        marginLeft: "1px",
        top: `${offset * offsetFactor}px`,
        width: `calc(${100 * periodLength}% - 2px)`,
        height: `${lineHeight}px`,
        backgroundColor: CATEGORIES[categoryId].mainColor,
      }}
      onClick={handleClick}
    ></div>
  );
}

ArtworkLine.propTypes = {
  offset: PropTypes.number,
  lineHeight: PropTypes.number,
  artworkData: PropTypes.object,
  onClick: PropTypes.func,
};

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
