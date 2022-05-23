import { SET_TEXT, ERROR_TEXT } from "./type";
import { v4 } from "uuid";

export const setText = (txt) => (dispatch) => {
  const id = v4();
  try {
    dispatch({
      type: SET_TEXT,
      payload: { txt, id },
    });
  } catch (err) {
    dispatch({
      type: ERROR_TEXT,
      payload: {
        msg: err.response,
        status: err.response.status,
      },
    });
  }
};
