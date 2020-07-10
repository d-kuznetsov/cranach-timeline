import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Popover from "@material-ui/core/Popover";
import styles from "./PopupFilter.module.scss";

interface Props {
  children: React.ReactNode;
}

export default function PopupFilter({ children }: Props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const openFilterPanel = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const closeFilterPanel = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <IconButton onClick={openFilterPanel}>
        <FilterListIcon fontSize="large" color="secondary" />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={closeFilterPanel}
      >
        <div className={styles.panel}>
          <section className={styles.closeButtonWrapper}>
            <IconButton onClick={closeFilterPanel}>
              <FilterListIcon fontSize="large" color="primary" />
            </IconButton>
          </section>
          <section className={styles.filterItems}>{children}</section>
        </div>
      </Popover>
    </React.Fragment>
  );
}
