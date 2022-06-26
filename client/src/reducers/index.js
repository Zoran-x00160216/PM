import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import text from "./text";
import webAccounts from "./webAccounts";
import cards from "./cards";
import notes from "./notes";
import identity from "./identity";
import users from "./users";

export default combineReducers({
  alert,
  auth,
  text,
  webAccounts,
  cards,
  notes,
  identity,
  users,
});
