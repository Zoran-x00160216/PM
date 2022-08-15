import {
  GET_IDENTITY,
  ERROR_IDENTITY,
  CLEAR_IDENTITY,
  EDIT_IDENTITY
} from "../actions/type";

const initialState = {
  identity: [],
  editStatus: {},
  loading: true,
  status: 0,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_IDENTITY:
      return {
        ...state,
        identity: payload,
        editStatus: {},
        loading: false
      };
    case EDIT_IDENTITY:
      return {
        ...state,
        loading: false,
        editStatus: payload
      };
    case ERROR_IDENTITY:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_IDENTITY:
      return {
        ...state,
        identity: [],
        editStatus: {},
        error: {},
        loading: false
      };
    default:
      return state;
  }
}
