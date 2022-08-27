import { SET_TEXT, ERROR_TEXT, CLEAR_TEXT } from "../actions/type";

const initialState = {
  txt: "",
  loading: true,
  error: {}
};

export default function text(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TEXT:
      return {
        ...state,
        txt: payload
      };
    case ERROR_TEXT:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_TEXT:
      return {
        ...state,
        txt: "",
        loading: false
      };
    default:
      return state;
  }
}
