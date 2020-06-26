import Router from "next/router";
import axios from "axios";

export const CURRENT_LINK = "CURRENT_LINK";
export const PERIOD = "PERIOD";
export const ARTWORKS = "ARTWORKS";
export const CATEGORY = "CATEGORY";
export const LINE_HEIGHT = "LINE_HEIGHT";
export const ARTWORK_TO_VIEW = "ARTWORK_TO_VIEW";
export const TEXT_TO_SEARCH = "TEXT_TO_SEARCH";

export function setCurrentLink(link) {
  return (dispatch) => {
    Router.push(link);
    dispatch({ type: CURRENT_LINK, link });
  };
}

export function setPeriod(period) {
  return {
    type: PERIOD,
    period,
  };
}

export function setArtworks(artworks) {
  return { type: ARTWORKS, artworks };
}

export function setCategoryDisplay(id, displayed) {
  return {
    type: CATEGORY,
    id,
    displayed,
  };
}

export function loadArtworks() {
  return (dispatch) => {
    axios.get("/api/data").then((res) => {
      dispatch(setArtworks(res.data));
    });
  };
}

export function setLineHeight(lineHeight) {
  return { type: LINE_HEIGHT, lineHeight };
}

export function setArtworkToView(artwork) {
  return {
    type: ARTWORK_TO_VIEW,
    artwork,
  };
}

export function setTextToSearch(text) {
  return {
    type: TEXT_TO_SEARCH,
    text,
  };
}
