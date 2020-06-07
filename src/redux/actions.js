import Router from "next/router";
export const CURRENT_LINK = "CURRENT_LINK";
export const PERIOD = "PERIOD";
export const ARTWORKS = "ARTWORKS";
export const CATEGORY = "CATEGORY";

export function setCurrentLink(link) {
  return (dispatch) => {
    dispatch({ type: CURRENT_LINK, link: "" });
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

import { getAll } from "../dataSource";
export function loadArtworks() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(setArtworks(getAll()));
    }, 1000);
  };
}
