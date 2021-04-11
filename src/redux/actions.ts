import axios from "axios";
import { Action, AsyncAction, Period, Artwork } from "./types";
import createTheme from "../lib/createTheme";
import { SECONDARY_COLOR } from "../constants";

export const PERIOD = "PERIOD";
export const ARTWORKS = "ARTWORKS";
export const CATEGORY = "CATEGORY";
export const LINE_HEIGHT = "LINE_HEIGHT";
export const ARTWORK_TO_VIEW = "ARTWORK_TO_VIEW";
export const TEXT_TO_SEARCH = "TEXT_TO_SEARCH";
export const IS_LOADING = "IS_LOADING";
export const COLOR_PALETTE = "COLOR_PALETTE";

export function setPeriod(period: Period): Action {
  return {
    type: PERIOD,
    period,
  };
}

export function setArtworks(artworks: Array<Artwork>): Action {
  return { type: ARTWORKS, artworks };
}

export function setCategoryDisplay(id: number, displayed: boolean): Action {
  return {
    type: CATEGORY,
    id,
    displayed,
  };
}

export function loadArtworks(): AsyncAction {
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const res = await axios.get("api/data");
      dispatch(setArtworks(res.data));
    } catch (err) {
      alert("Error occurred while loading data");
    } finally {
      dispatch(setIsLoading(false));
    }
  };
}

export function setLineHeight(lineHeight: number): Action {
  return { type: LINE_HEIGHT, lineHeight };
}

export function setArtworkToView(artwork: Artwork | null): Action {
  return {
    type: ARTWORK_TO_VIEW,
    artwork,
  };
}

export function setTextToSearch(text: string): Action {
  return {
    type: TEXT_TO_SEARCH,
    text,
  };
}

export function setIsLoading(isLoading: boolean) {
  return {
    type: IS_LOADING,
    isLoading,
  };
}

export function setColorPalette(primaryColor: string, secondaryColor: string = SECONDARY_COLOR) {
  return {
    type: COLOR_PALETTE,
    colorPalette: createTheme({
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
    }).palette,
  };
}
