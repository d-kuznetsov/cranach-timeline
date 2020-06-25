import { useSelector, useDispatch } from "react-redux";
import { setArtworkToView } from "../../redux/actions";
import {
  GRID_IMAGE_HEIGHT,
  GRID_IMAGE_WIDTH,
  GRID_SPACE,
  GRI_MIN_COLUMN_COUNT,
  GRID_MIN_SPACE,
} from "../../constants";

import PropTypes from "prop-types";
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

export function GridContainer() {
  const { artworksToView } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleItemClick = (artwork) => {
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

export function GridComponent({ items, imageWidth, imageHeight, space, onItemClick }) {
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
            onItemsRendered={({ visibleStartIndex }) => 1}
          >
            {Row}
          </List>
        );
      }}
    </AutoSizer>
  );
}

GridComponent.propTypes = {
  items: PropTypes.array,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  space: PropTypes.number,
  onItemClick: PropTypes.func,
};

const Row = memo(({ index: i, data, style }) => {
  const { items, space, imageHeight, imageWidth, columnCount, onItemClick } = data;
  const tileWidth = imageWidth + space;
  const columns = [];
  let size;
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

Row.propTypes = {
  index: PropTypes.number,
  style: PropTypes.object,
  data: PropTypes.shape({
    items: PropTypes.array,
    space: PropTypes.number,
    imageHeight: PropTypes.number,
    imageWidth: PropTypes.number,
    columnCount: PropTypes.number,
    onItemClick: PropTypes.func,
  }),
};
