import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer, { initialState } from "./reducer";

export function createReduxStore(stateToMerge) {
  return createStore(
    reducer,
    { ...initialState, ...stateToMerge },
    applyMiddleware(thunkMiddleware)
  );
}
