import { useSelector, useDispatch } from "react-redux";
import { setArtworkToView } from "../../redux/actions";

import { useState } from "react";
import { useRouter } from "next/router";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
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
import { RootState, Artwork, ImageSize } from "../../redux/types";
import styles from "./Viewer.module.scss";

const IMAGE_SIZES: Array<ImageSize> = ["s", "m", "l", "xl"];

export function ViewerContainer(props: Partial<Props>) {
  const { openViewer, artworkToView } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setArtworkToView(null));
  };
  return (
    <ViewerComponent
      {...(props as Props)}
      open={openViewer}
      data={artworkToView}
      onClose={handleClose}
    />
  );
}

interface Props {
  open: boolean;
  data: Artwork | null;
  imageSize: ImageSize;
  fullScreen: boolean;
  onClose: () => void;
}

export function ViewerComponent(props: Props) {
  const { open, data, imageSize: initialImageSize = "s", fullScreen = false, onClose } = props;
  const [imageSize, setSize] = useState(initialImageSize);
  const router = useRouter();
  const handleMoroBtnClick = () => {
    router.push({
      pathname: "/artwork",
      query: { id: data?.objectId },
    });
  };

  return (
    <Dialog open={open} maxWidth="lg" onClose={onClose} fullScreen={fullScreen}>
      <section className={styles.actions}>
        <div className={styles.leftButtonsWrap} />
        <div className={styles.sizeButtonWrap}>
          <ButtonGroup size="small" className={styles.sizeBtnsWrap}>
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
        <div className={styles.rightButtonsWrap}>
          <IconButton onClick={handleMoroBtnClick} size="small">
            <OpenInBrowserIcon />
          </IconButton>
          <IconButton onClick={onClose} size="small" data-testid="close-btn">
            <CloseIcon />
          </IconButton>
        </div>
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

function getDialogTitle(data: Artwork, fullScreen: boolean): string {
  const title = getArtworkTitle(data);
  const period = getPeriod(data);
  const persons = getInvolvedPersons(data);
  return `${title} ${period} ${fullScreen ? persons : ""}`;
}
