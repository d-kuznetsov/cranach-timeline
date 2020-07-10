import { useSelector, useDispatch } from "react-redux";
import { setArtworkToView } from "../../redux/actions";

import styles from "./TimeLine.module.scss";
import { getArtworkTitle, getPeriod } from "../../lib/extractArtworkData";
import { CATEGORIES } from "../../constants";
import { RootState, Artwork } from "../../redux/types";

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
  period: [number, number];
  items: Array<Artwork>;
  lineHeight: number;
  onLineClick: (value: ArtworkLine) => void;
}

export function TimelineComponent({ period, items, lineHeight = 16, onLineClick }: Props) {
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

function getItemsByYear(items: Array<ArtworkLine>): { [year: number]: Array<ArtworkLine> } {
  const itemsByYear: { [year: number]: Array<ArtworkLine> } = {};
  items.forEach((item) => {
    if (!itemsByYear[item.dating.begin]) {
      itemsByYear[item.dating.begin] = [];
    }
    itemsByYear[item.dating.begin].push(item);
  });
  return itemsByYear;
}

function getYearList(period: [number, number]): number[] {
  const list = [];
  const [start, end] = period;
  for (let year = start; year <= end; year++) {
    list.push(year);
  }
  return list;
}

function withAdditionalProps(
  yearList: number[],
  items: Array<Artwork>
): { modifiedItems: Array<ArtworkLine>; maxOffsetFactor: number } {
  let matrix: { [year: number]: boolean[] } = {};
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
