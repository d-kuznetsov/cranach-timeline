import { useSelector, useDispatch } from "react-redux";
import { setLineHeight } from "../../redux/actions";

import PropTypes from "prop-types";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const MIN_VALUE = 4;
const MAX_VALUE = 16;

export function LineHeightSliderContainer() {
  const lineHeight = useSelector((state) => state.lineHeight);
  const dispatch = useDispatch();
  const handleLineHeightChange = (e, lineHeight) => dispatch(setLineHeight(lineHeight));
  return <LineHeightSliderComponent defaultValue={lineHeight} onChange={handleLineHeightChange} />;
}

export function LineHeightSliderComponent({ defaultValue, onChange }) {
  return (
    <Slider
      defaultValue={defaultValue}
      min={MIN_VALUE}
      max={MAX_VALUE}
      step={0.1}
      valueLabelDisplay="off"
      onChangeCommitted={onChange}
    />
  );
}

LineHeightSliderComponent.propTypes = {
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
};
