import { useSelector, useDispatch } from "react-redux";
import { setArtworkToView } from "../../redux/actions";

import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {
  getArtworkTitle,
  getInvolvedPersons,
  getImageSrc,
  getPeriod,
} from "../../lib/extractArtworkData";
import styles from "./Viewer.module.scss";

export function ViewContainer(props) {
  const { openViewer, artworkToView } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setArtworkToView(null));
  };
  return <ViewComponent {...props} open={openViewer} data={artworkToView} onClose={handleClose} />;
}

function getDialogTitle(data, fullScreen) {
  const title = getArtworkTitle(data);
  const period = getPeriod(data);
  const persons = getInvolvedPersons(data);
  return `${title} ${period} ${fullScreen ? persons : ""}`;
}

export function ViewComponent(props) {
  const { open, data, onClose, imageSize = "s", fullScreen = false } = props;
  return (
    <Dialog open={open} maxWidth="lg" onClose={onClose} fullScreen={fullScreen}>
      <DialogTitle>{data && getDialogTitle(data, fullScreen)}</DialogTitle>
      <DialogContent>
        {data && (
          <div className={styles.imageWrapper}>
            <img src={getImageSrc(data, imageSize)} alt={getArtworkTitle(data)} />
          </div>
        )}
        <DialogContentText></DialogContentText>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={onClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}

ViewComponent.propTypes = {
  open: PropTypes.bool,
  data: PropTypes.object,
  onClose: PropTypes.func,
  imageSize: PropTypes.string,
  fullScreen: PropTypes.bool,
};
