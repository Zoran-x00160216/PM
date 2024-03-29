import { v4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./type";

// to dispatch alert to redux store
export const setAlert = (msg, alertType) => (dispatch) => {
  const id = v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 2000);
};
