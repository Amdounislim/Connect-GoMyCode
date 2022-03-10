import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import profile from "./profileReducer";
import admin from "./adminReducer";

export default combineReducers({
  auth,
  admin,
  alert,
  profile
});
