import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

export function GridContainer() {
  const { artworksToView } = useSelector((state) => state);
  return <GridComponent items={artworksToView} columnNumber={4} space={8} />;
}

export function GridComponent({ items, columnNumber, space }) {
  const rowCount = Math.ceil(items.length / columnNumber);
  return (
    <AutoSizer>
      {({ height, width }) => {
        const gridCellHeight = Math.round(width / columnNumber);
        const itemHeight = gridCellHeight + space;
        return (
          <List
            itemData={{
              items,
              space,
              gridCellHeight,
              columnNumber,
            }}
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

const Row = ({ index: i, data, style }) => {
  const { items, space, gridCellHeight, columnNumber } = data;
  const columns = [];
  for (let j = i * columnNumber; j < i * columnNumber + columnNumber; j++) {
    items[j] &&
      columns.push(
        <GridListTile key={items[j].objectId}>
          <img src={items[j].images.sizes.s.src} alt={"dsd"} />
          <GridListTileBar
            title={items[j].titles[0] && items[j].titles[0].title}
            subtitle={items[j].involvedPersons[0] && items[j].involvedPersons[0].name}
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
};

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
