import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPeriod } from "../../redux/actions";

import Slider, { Mark } from "@material-ui/core/Slider";
import styles from "./RangeSlider.module.scss";

const PERIOD_MIN_VALUE = 1472;
const PERIOD_MAX_VALUE = 1586;
const IMPORTANT_DATES = [1472, 1495, 1518, 1541, 1564, 1586];

const marks: Array<Mark> = IMPORTANT_DATES.map((year) => {
  return {
    value: year,
    label: year,
  };
});

export function RangeSliderContainer(props) {
  const initialRange = useSelector((state) => state.period);
  const dispatch = useDispatch();
  const handleRangeChange = (e, range) => {
    dispatch(setPeriod(range));
  };

  return (
    <RangeSliderComponent
      {...props}
      initialRange={initialRange}
      minValue={PERIOD_MIN_VALUE}
      maxValue={PERIOD_MAX_VALUE}
      onChange={handleRangeChange}
      marks={marks}
    />
  );
}

interface Props {
  initialRange: [number, number];
  minValue: number;
  maxValue: number;
  marks: Array<Mark>;
  base: boolean;
  onChange: (e: React.ChangeEvent<{}>, range: [number, number]) => void;
}

export function RangeSliderComponent(props: Props) {
  const { initialRange, minValue, maxValue, onChange, marks, base = false } = props;
  const [range, setRange] = useState(initialRange);
  const handleRangeChange = (e, range) => {
    setRange(range);
  };

  return (
    <div className={`${styles.container} ${base ? styles.container__base : ""}`}>
      <Slider
        value={range}
        min={minValue}
        max={maxValue}
        onChange={handleRangeChange}
        onChangeCommitted={onChange}
        marks={base ? false : marks}
        valueLabelDisplay="auto"
      />
    </div>
  );
}
