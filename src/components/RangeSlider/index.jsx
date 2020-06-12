import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPeriod } from "../../redux/actions";
import { PERIOD_MIN_VALUE, PERIOD_MAX_VALUE } from "../../constants";

import PropTypes from "prop-types";
import Slider from "@material-ui/core/Slider";

export function RangeSliderContainer() {
  const initialRange = useSelector((state) => state.period);
  const dispatch = useDispatch();
  const handleRangeChange = (e, range) => {
    dispatch(setPeriod(range));
  };

  return (
    <RangeSliderComponent
      initialRange={initialRange}
      minValue={PERIOD_MIN_VALUE}
      maxValue={PERIOD_MAX_VALUE}
      onChange={handleRangeChange}
    />
  );
}

export function RangeSliderComponent({ initialRange, minValue, maxValue, onChange }) {
  const [range, setRange] = useState(initialRange);
  const handleRangeChange = (e, range) => {
    setRange(range);
  };

  return (
    <Slider
      value={range}
      min={minValue}
      max={maxValue}
      onChange={handleRangeChange}
      onChangeCommitted={onChange}
      valueLabelDisplay="auto"
    />
  );
}

RangeSliderComponent.propTypes = {
  initialRange: PropTypes.array,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  onChange: PropTypes.func,
};
