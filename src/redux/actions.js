import Router from "next/router";
export const CURRENT_LINK = "CURRENT_LINK";

export function setCurrentLink(link) {
  return (dispatch) => {
    dispatch({ type: CURRENT_LINK, link: "" });
    Router.push(link);
    dispatch({ type: CURRENT_LINK, link });
  };
}
