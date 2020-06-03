import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";

export function createReduxStore() {
  return createStore(reducer, applyMiddleware(thunkMiddleware));
}
