import { useSelector, useDispatch } from "react-redux";
import { setArtworkToView } from "../../redux/actions";
import { RootState, Artwork, Period } from "../../redux/types";

import { getArtworkTitle, getPeriod } from "../../lib/extractArtworkData";
import { CATEGORIES } from "../../constants";
import styles from "./TimeLine.module.scss";

export function TimelineContainer() {
  const { period, artworksToView, lineHeight } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const handleLineClick = (artwork: Artwork) => {
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

interface ArtworkLine extends Artwork {
  offsetFactor: number;
  periodLength: number;
}

interface Props {
  period: Period;
  items: Array<Artwork>;
  lineHeight: number;
  onLineClick: (value: ArtworkLine) => void;
}

export function TimelineComponent({ period, items, lineHeight = 16, onLineClick }: Props) {
  const yearList = getYearList(period);
  const { modifiedItems, maxOffsetFactor } = withAdditionalProps(yearList, items, period);
  const itemsByYear = getItemsByYear(modifiedItems, period);
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

interface ArtworkLineProps {
  offset: number;
  lineHeight: number;
  artworkData: ArtworkLine;
  onClick: (artwork: ArtworkLine) => void;
}

function ArtworkLine({ artworkData, offset, lineHeight, onClick }: ArtworkLineProps) {
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

function getItemsByYear(
  items: Array<ArtworkLine>,
  period: Period
): { [year: number]: Array<ArtworkLine> } {
  const itemsByYear: { [year: number]: Array<ArtworkLine> } = {};
  items.forEach((item) => {
    const year = item.dating.begin < period[0] ? period[0] : item.dating.begin;
    if (!itemsByYear[year]) {
      itemsByYear[year] = [];
    }
    itemsByYear[year].push(item);
  });
  return itemsByYear;
}

function getYearList(period: Period): number[] {
  const list = [];
  const [start, end] = period;
  for (let year = start; year <= end; year++) {
    list.push(year);
  }
  return list;
}

function withAdditionalProps(
  yearList: number[],
  items: Array<Artwork>,
  period: Period
): { modifiedItems: Array<ArtworkLine>; maxOffsetFactor: number } {
  let matrix: { [year: number]: boolean[] } = {};
  let maxOffsetFactor = 0;
  yearList.forEach((year) => (matrix[year] = new Array(items.length).fill(false)));
  const modifiedItems = items.map((item) => {
    let offsetFactor = 0;
    let start = item.dating.begin < period[0] ? period[0] : item.dating.begin;
    let end = item.dating.end > period[1] ? period[1] : item.dating.end;
    let year = start;
    while (true) {
      if (matrix[year][offsetFactor]) {
        offsetFactor++;
        year = start;
      } else {
        year++;
      }
      if (year > end) {
        if (offsetFactor > maxOffsetFactor) {
          maxOffsetFactor = offsetFactor;
        }
        break;
      }
    }
    for (let year = start; year <= end; year++) {
      matrix[year][offsetFactor] = true;
    }
    return {
      ...item,
      offsetFactor,
      periodLength: end - start + 1,
    };
  });

  return {
    modifiedItems,
    maxOffsetFactor,
  };
}
