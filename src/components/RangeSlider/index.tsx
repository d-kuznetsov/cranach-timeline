import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPeriod } from "../../redux/actions";
import { RootState, Period } from "../../redux/types";

import Slider, { Mark } from "@material-ui/core/Slider";
import { PERIOD_MIN_VALUE, PERIOD_MAX_VALUE } from "../../constants";
import styles from "./RangeSlider.module.scss";

const IMPORTANT_DATES = [PERIOD_MIN_VALUE, 1514, 1538, 1562, PERIOD_MAX_VALUE];
const marks: Array<Mark> = IMPORTANT_DATES.map((year) => {
  return {
    value: year,
    label: year,
  };
});

export function RangeSliderContainer(props: Partial<Props>) {
  const initialRange = useSelector((state: RootState) => state.period);
  const dispatch = useDispatch();
  const handleRangeChange = (e: React.ChangeEvent<{}>, range: Period) => {
    dispatch(setPeriod(range));
  };

  return (
    <RangeSliderComponent
      {...(props as Props)}
      initialRange={initialRange}
      minValue={PERIOD_MIN_VALUE}
      maxValue={PERIOD_MAX_VALUE}
      onChange={handleRangeChange}
      marks={marks}
    />
  );
}

interface Props {
  initialRange: Period;
  minValue: number;
  maxValue: number;
  marks: Array<Mark>;
  base: boolean;
  onChange: (e: React.ChangeEvent<{}>, range: any) => void;
}

export function RangeSliderComponent(props: Props) {
  const { initialRange, minValue, maxValue, onChange, marks, base = false } = props;
  const [range, setRange] = useState(initialRange);
  const handleRangeChange = (e: React.ChangeEvent<{}>, range: any) => {
    setRange(range as Period);
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
