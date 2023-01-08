import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { tourRedcuer } from "./tourReducer";

export default combineReducers({
  auth: authReducer,
  tours: tourRedcuer,
});
