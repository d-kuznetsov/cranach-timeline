import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer, { initialState } from "./reducer";

export function createReduxStore() {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunkMiddleware),
  );
}
