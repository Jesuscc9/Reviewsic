import { combineReducers } from "redux";
import user from "./user/reducer";
import data from "./data/reducer";

export default combineReducers({ user, data });
