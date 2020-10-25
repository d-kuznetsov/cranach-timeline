import { useSelector, useDispatch } from "react-redux";
import { setArtworkToView } from "../../redux/actions";

import { memo } from "react";
import memoize from "memoize-one";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List, areEqual } from "react-window";
import {
  getArtworkTitle,
  getImageSrc,
  getInvolvedPersons,
  getDimensions,
  isLandscape,
} from "../../lib/extractArtworkData";
import styles from "./Grid.module.scss";
import { RootState, Artwork, ImageSize } from "../../redux/types";

const GRID_IMAGE_WIDTH = 200;
const GRID_IMAGE_HEIGHT = 250;
const GRID_SPACE = 12;
const GRI_MIN_COLUMN_COUNT = 2;
const GRID_MIN_SPACE = 6;

export function GridContainer() {
  const { artworksToView } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const handleItemClick = (artwork: Artwork) => {
    dispatch(setArtworkToView(artwork));
  };
  return (
    <GridComponent
      items={artworksToView}
      imageWidth={GRID_IMAGE_WIDTH}
      imageHeight={GRID_IMAGE_HEIGHT}
      space={GRID_SPACE}
      onItemClick={handleItemClick}
    />
  );
}

const createItemData = memoize(
  (items, space, imageHeight, imageWidth, columnCount, onItemClick) => ({
    items,
    space,
    imageHeight,
    imageWidth,
    columnCount,
    onItemClick,
  })
);

interface GridProps {
  items: Array<Artwork>;
  space: number;
  imageHeight: number;
  imageWidth: number;
  onItemClick: (item: Artwork) => void;
  columnCount?: number;
}

export function GridComponent(props: GridProps) {
  let { items, imageWidth, imageHeight, space, onItemClick } = props;
  return (
    <AutoSizer>
      {({ height, width }) => {
        if (width <= (imageWidth + space) * GRI_MIN_COLUMN_COUNT) {
          space = GRID_MIN_SPACE;
          imageWidth = width / GRI_MIN_COLUMN_COUNT - space * 3;
          imageHeight = imageWidth * 1.25;
        }

        const columnCount = Math.floor(width / (imageWidth + space));
        const rowCount = Math.ceil(items.length / columnCount);
        const tileHeight = imageHeight + space;
        return (
          <List
            height={height}
            width={width}
            itemCount={rowCount}
            itemSize={tileHeight}
            itemData={createItemData(
              items,
              space,
              imageHeight,
              imageWidth,
              columnCount,
              onItemClick
            )}
          >
            {Row}
          </List>
        );
      }}
    </AutoSizer>
  );
}

interface RowProps {
  index: number;
  style: React.CSSProperties;
  data: GridProps;
}

const Row = memo(({ index: i, data, style }: RowProps) => {
  const { items, space, imageHeight, imageWidth, columnCount = 0, onItemClick } = data;
  const tileWidth = imageWidth + space;
  const columns = [];
  let size: ImageSize;
  for (let j = i * columnCount; j < i * columnCount + columnCount; j++) {
    items[j] &&
      columns.push(
        <div
          key={items[j].objectId}
          style={{ flexBasis: `${tileWidth}px` }}
          className={styles.tile}
        >
          <div
            style={{
              width: `${imageWidth}px`,
              height: `${imageHeight}px`,
            }}
            className={styles["tile-imageWrapper"]}
          >
            {(size = isLandscape(items[j]) ? "s" : "xs") && (
              <img
                src={getImageSrc(items[j], size)}
                alt={getArtworkTitle(items[j])}
                height={getDimensions(items[j], size).height}
                width={getDimensions(items[j], size).width}
                onClick={() => {
                  onItemClick(items[j]);
                }}
              />
            )}
            <div className={styles.tileHover}></div>
            <div className={styles.tileBar}>
              <div className={styles.titleWrap}>
                <div className={styles.imageTitle} title={getArtworkTitle(items[j])}>
                  {getArtworkTitle(items[j])}
                </div>
                <div className={styles.imageSubtitle} title={getInvolvedPersons(items[j])}>
                  {getInvolvedPersons(items[j])}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
  return (
    <div style={{ ...style }} className={styles.row}>
      {columns}
    </div>
  );
}, areEqual);
