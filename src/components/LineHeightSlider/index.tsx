import { useSelector, useDispatch } from "react-redux";
import { setLineHeight } from "../../redux/actions";

import { useState } from "react";
import Slider from "@material-ui/core/Slider";
import { RootState } from "../../redux/types";

const MIN_VALUE = 4;
const MAX_VALUE = 16;

export function LineHeightSliderContainer() {
  const lineHeight = useSelector((state: RootState) => state.lineHeight);
  const dispatch = useDispatch();
  const handleLineHeightChange = (e: React.ChangeEvent<{}>, lineHeight: number) =>
    dispatch(setLineHeight(lineHeight));
  return <LineHeightSliderComponent defaultValue={lineHeight} onChange={handleLineHeightChange} />;
}

interface Props {
  defaultValue: number;
  onChange: (e: React.ChangeEvent<{}>, height: any) => void;
}

export function LineHeightSliderComponent({ defaultValue, onChange }: Props) {
  const [value, setValue] = useState(defaultValue);
  const handleValueChange = (e: React.ChangeEvent<{}>, newValue: any) => {
    setValue(+newValue);
  };
  return (
    <Slider
      value={value}
      min={MIN_VALUE}
      max={MAX_VALUE}
      step={0.1}
      valueLabelDisplay="off"
      onChange={handleValueChange}
      onChangeCommitted={onChange}
    />
  );
}
