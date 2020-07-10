import Router from "next/router";
import axios from "axios";
import { Action, AsyncAction, Period, Artwork } from "./types";

export const CURRENT_LINK = "CURRENT_LINK";
export const PERIOD = "PERIOD";
export const ARTWORKS = "ARTWORKS";
export const CATEGORY = "CATEGORY";
export const LINE_HEIGHT = "LINE_HEIGHT";
export const ARTWORK_TO_VIEW = "ARTWORK_TO_VIEW";
export const TEXT_TO_SEARCH = "TEXT_TO_SEARCH";

export function setCurrentLink(link: string): AsyncAction {
  return (dispatch) => {
    Router.push(link);
    dispatch({ type: CURRENT_LINK, link });
  };
}

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
  return (dispatch) => {
    axios.get("/api/data").then((res) => {
      dispatch(setArtworks(res.data));
    });
  };
}

export function setLineHeight(lineHeight: number): Action {
  return { type: LINE_HEIGHT, lineHeight };
}

export function setArtworkToView(artwork: Artwork): Action {
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
