import { useSelector, useDispatch } from "react-redux";
import { setArtworkToView } from "../../redux/actions";

import PropTypes from "prop-types";
import { memo } from "react";
import memoize from "memoize-one";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List, areEqual } from "react-window";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { getArtworkTitle, getImageSrc, getInvolvedPersons } from "../../lib/extractArtworkData";
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
      itemWidth={300}
      space={12}
      onItemClick={handleItemClick}
    />
  );
}

const createItemData = memoize((items, space, gridCellHeight, columnNumber, onItemClick) => ({
  items,
  space,
  gridCellHeight,
  columnNumber,
  onItemClick,
}));

export function GridComponent({ items, itemWidth, space, onItemClick }) {
  return (
    <AutoSizer>
      {({ height, width }) => {
        const columnNumber = Math.ceil(width / itemWidth);
        const rowCount = Math.ceil(items.length / columnNumber);
        const gridCellHeight = Math.round(width / columnNumber);
        const itemHeight = gridCellHeight + space;
        return (
          <List
            itemData={createItemData(items, space, gridCellHeight, columnNumber, onItemClick)}
            height={height}
            itemCount={rowCount}
            itemSize={itemHeight}
            width={width}
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
  itemWidth: PropTypes.number,
  space: PropTypes.number,
  onItemClick: PropTypes.func,
};

const Row = memo(({ index: i, data, style }) => {
  const { items, space, gridCellHeight, columnNumber, onItemClick } = data;
  const columns = [];
  for (let j = i * columnNumber; j < i * columnNumber + columnNumber; j++) {
    items[j] &&
      columns.push(
        <GridListTile key={items[j].objectId} className={styles.itemImage}>
          <img
            className={styles.itemImage}
            src={getImageSrc(items[j])}
            alt={getArtworkTitle(items[j])}
            onClick={() => {
              onItemClick(items[j]);
            }}
          />
          <GridListTileBar
            title={getArtworkTitle(items[j])}
            subtitle={getInvolvedPersons(items[j])}
          />
        </GridListTile>
      );
  }
  return (
    <div style={{ ...style, height: `${gridCellHeight + space}px`, padding: `0 ${space}px` }}>
      <GridList cellHeight={gridCellHeight} cols={columnNumber} spacing={space}>
        {columns}
      </GridList>
    </div>
  );
}, areEqual);

Row.propTypes = {
  index: PropTypes.number,
  style: PropTypes.object,
  data: PropTypes.shape({
    items: PropTypes.array,
    space: PropTypes.number,
    gridCellHeight: PropTypes.number,
    columnNumber: PropTypes.number,
    onItemClick: PropTypes.func,
  }),
};
