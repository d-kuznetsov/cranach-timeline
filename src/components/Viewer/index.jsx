import { useSelector, useDispatch } from "react-redux";
import { setArtworkToView } from "../../redux/actions";

import PropTypes from "prop-types";
import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {
  getArtworkTitle,
  getInvolvedPersons,
  getImageSrc,
  getPeriod,
} from "../../lib/extractArtworkData";
import styles from "./Viewer.module.scss";

const IMAGE_SIZES = ["s", "m", "l", "xl"];

export function ViewContainer(props) {
  const { openViewer, artworkToView } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setArtworkToView(null));
  };
  return <ViewComponent {...props} open={openViewer} data={artworkToView} onClose={handleClose} />;
}

export function ViewComponent(props) {
  const { open, data, imageSize: initialImageSize = "s", fullScreen = false, onClose } = props;
  const [imageSize, setSize] = useState(initialImageSize);
  return (
    <Dialog open={open} maxWidth="lg" onClose={onClose} fullScreen={fullScreen}>
      <section className={styles.actions}>
        <div className={styles.sizeButtonWrap}>
          <ButtonGroup size="small" className={styles.sizeButtons}>
            {IMAGE_SIZES.map((size) => {
              return (
                <Button key={size} onClick={() => setSize(size)}>
                  <span className={size === imageSize ? styles.sizeLabel__selected : ""}>
                    {size}
                  </span>
                </Button>
              );
            })}
          </ButtonGroup>
        </div>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </section>
      <DialogContent>
        {data && (
          <div className={styles.imageWrapper}>
            <img src={getImageSrc(data, imageSize)} alt={getArtworkTitle(data)} />
          </div>
        )}
      </DialogContent>
      <section className={styles.description}>{data && getDialogTitle(data, fullScreen)}</section>
    </Dialog>
  );
}

ViewComponent.propTypes = {
  open: PropTypes.bool,
  data: PropTypes.object,
  imageSize: PropTypes.string,
  fullScreen: PropTypes.bool,
  onClose: PropTypes.func,
};

function getDialogTitle(data, fullScreen) {
  const title = getArtworkTitle(data);
  const period = getPeriod(data);
  const persons = getInvolvedPersons(data);
  return `${title} ${period} ${fullScreen ? persons : ""}`;
}
