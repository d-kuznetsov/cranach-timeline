import { combineReducers } from "redux";
import { CURRENT_LINK } from "./actions";

const initialLink = "";
const link = (state = initialLink, action) => {
  switch (action.type) {
    case CURRENT_LINK:
      return action.link;
    default:
      return state;
  }
};

export default combineReducers({
  link,
});
