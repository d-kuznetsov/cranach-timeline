import { useSelector, useDispatch } from "react-redux";
import { setArtworkToView } from "../../redux/actions";

import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import {
  getArtworkTitle,
  getInvolvedPersons,
  getImageSrc,
  getPeriod,
} from "../../lib/extractArtworkData";
import styles from "./Viewer.module.scss";

export function ViewContainer() {
  const { openViewer, artworkToView } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setArtworkToView(null));
  };
  return <ViewComponent open={openViewer} data={artworkToView} onClose={handleClose} />;
}

export function ViewComponent({ open, data, onClose }) {
  return (
    <Dialog open={open} maxWidth="lg" onClose={onClose}>
      <DialogTitle>{data && getArtworkTitle(data)}</DialogTitle>
      <DialogContent>
        {data && (
          <div className={styles.imageWrapper}>
            <img src={getImageSrc(data)} alt={getArtworkTitle(data)} />
          </div>
        )}
        <DialogContentText>
          {data && `${getInvolvedPersons(data)}, ${getPeriod(data)}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

ViewComponent.propTypes = {
  open: PropTypes.bool,
  data: PropTypes.object,
  onClose: PropTypes.func,
};
