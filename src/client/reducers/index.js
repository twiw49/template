import { combineReducers } from "redux";
import isLoggedIn from "./isLoggedIn";

const rootReducer = combineReducers({
  isLoggedIn
});

export default rootReducer;
