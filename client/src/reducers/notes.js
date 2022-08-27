import {
  GET_NOTES,
  ERROR_NOTES,
  CLEAR_NOTES,
  EDIT_NOTES
} from "../actions/type";

const initialState = {
  notes: [],
  editStatus: {},
  loading: true,
  error: {}
};

export default function notes(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTES:
      return {
        ...state,
        notes: payload,
        loading: false,
        editStatus: {}
      };
    case EDIT_NOTES:
      return {
        ...state,
        loading: false,
        editStatus: payload
      };
    case ERROR_NOTES:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_NOTES:
      return {
        ...state,
        notes: [],
        editStatus: {},
        loading: true,
        status: 0,
        error: {}
      };
    default:
      return state;
  }
}
