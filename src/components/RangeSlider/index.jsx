import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "@material-ui/core/Slider";
import { setPeriod } from "../../redux/actions";
import { PERIOD_MIN_VALUE, PERIOD_MAX_VALUE } from "../../constants";

export default function RangeSlider() {
  const initialRange = useSelector((state) => state.period);
  const dispatch = useDispatch();
  const [range, setRange] = useState(initialRange);
  const handleRangeChange = (e, range) => {
    setRange(range);
  };
  const handleRangeChangeCommitted = (e, range) => {
    dispatch(setPeriod(range));
  };

  return (
    <Slider
      value={range}
      min={PERIOD_MIN_VALUE}
      max={PERIOD_MAX_VALUE}
      onChange={handleRangeChange}
      onChangeCommitted={handleRangeChangeCommitted}
      valueLabelDisplay="on"
    />
  );
}
