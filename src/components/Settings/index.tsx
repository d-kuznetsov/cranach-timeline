import { useSelector, useDispatch } from "react-redux";
import { setColorPalette } from "../../redux/actions";
import { RootState } from "../../redux/types";

import React, { useState } from "react";
import { PRIMARY_COLOR } from "../../constants";
import IconButton from "@material-ui/core/IconButton";
import PaletteIcon from "@material-ui/icons/Palette";
import Drawer from "@material-ui/core/Drawer";
import { HexColorPicker } from "react-colorful";
import Button from "@material-ui/core/Button";
import styles from "./Settings.module.scss";

export default function SettingsContainer() {
  const { colorPalette } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const onColorChange = (color: string) => {
    dispatch(setColorPalette(color));
  };
  return <SettingsComponent color={colorPalette.primary.main} onColorChange={onColorChange} />;
}

interface Props {
  color: string;
  onColorChange: (color: string) => void;
}

export function SettingsComponent({ color, onColorChange }: Props) {
  const [open, setOpen] = useState(false);
  const onIconClick = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onDefaultBtnClick = () => {
    onColorChange(PRIMARY_COLOR);
  };
  return (
    <React.Fragment>
      <IconButton onClick={onIconClick}>
        <PaletteIcon htmlColor="#F5F5F5" fontSize="large" />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={onClose}>
        <div className={styles.content}>
          <div>Select a primary color</div>
          <hr />
          <HexColorPicker color={color} onChange={onColorChange} className={styles.colorPicker} />
          <hr />
          <Button className={styles.defaultBtn} variant="outlined" onClick={onDefaultBtnClick}>
            Default color
          </Button>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
