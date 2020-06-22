import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import { memo } from "react";
import memoize from "memoize-one";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List, areEqual } from "react-window";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { getArtworkTitle, getImageSrc, getInvolvedPersons } from "../../lib/extractArtworkData";

export function GridContainer() {
  const { artworksToView } = useSelector((state) => state);
  return <GridComponent items={artworksToView} columnNumber={4} space={8} />;
}

const createItemData = memoize((items, space, gridCellHeight, columnNumber) => ({
  items,
  space,
  gridCellHeight,
  columnNumber,
}));

export function GridComponent({ items, columnNumber, space }) {
  const rowCount = Math.ceil(items.length / columnNumber);
  return (
    <AutoSizer>
      {({ height, width }) => {
        const gridCellHeight = Math.round(width / columnNumber);
        const itemHeight = gridCellHeight + space;
        return (
          <List
            itemData={createItemData(items, space, gridCellHeight, columnNumber)}
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
  columnNumber: PropTypes.number,
  space: PropTypes.number,
};

const Row = memo(({ index: i, data, style }) => {
  const { items, space, gridCellHeight, columnNumber } = data;
  const columns = [];
  for (let j = i * columnNumber; j < i * columnNumber + columnNumber; j++) {
    items[j] &&
      columns.push(
        <GridListTile key={items[j].objectId}>
          <img
            src={getImageSrc(items[j])}
            alt={getArtworkTitle(items[j])}
            onClick={console.log("aaa")}
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
  }),
};
