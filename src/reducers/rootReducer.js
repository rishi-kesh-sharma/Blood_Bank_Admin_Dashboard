import { combineReducers } from "redux";

import bankReducer from "./bankReducer";
import authReducer from "./authReducer";
import { errorReducer } from "./errorReducer";
import overviewReducer from "./overviewReducer";
const rootReducer = combineReducers({
  bankReducer,
  authReducer,
  errorReducer,
  overviewReducer,
});

export default rootReducer;
