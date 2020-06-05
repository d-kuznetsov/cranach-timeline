import { combineReducers } from "redux";
import { CURRENT_LINK, PERIOD } from "./actions";

const initialLink = "";
const link = (state = initialLink, action) => {
  switch (action.type) {
    case CURRENT_LINK:
      return action.link;
    default:
      return state;
  }
};

const initialPeriod = [1500, 1630];
const period = (state = initialPeriod, action) => {
  switch (action.type) {
    case PERIOD:
      return action.period;
    default:
      return state;
  }
};

export default combineReducers({
  link,
  period,
});
