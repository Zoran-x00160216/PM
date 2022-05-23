import {
  GET_NOTES,
  ERROR_NOTES,
  CLEAR_NOTES,
  EDIT_NOTES,
} from "../actions/type";

const initialState = {
  notes: [],
  editNote: {},
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTES:
      return {
        ...state,
        notes: payload,
        loading: false,
      };
    // case POST_WEB_ACCOUNT:
    case EDIT_NOTES:
      return {
        ...state,
        loading: false,
        editNote: payload,
      };
    case ERROR_NOTES:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_NOTES:
      return {
        ...state,
        notes: [],
        loading: false,
      };
    default:
      return state;
  }
}
