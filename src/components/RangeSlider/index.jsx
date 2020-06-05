import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "@material-ui/core/Slider";
import { setPeriod } from "../../redux/actions";

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
      min={1500}
      max={1630}
      onChange={handleRangeChange}
      onChangeCommitted={handleRangeChangeCommitted}
      valueLabelDisplay="on"
    />
  );
}
