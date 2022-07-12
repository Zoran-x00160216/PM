import {
  GET_IDENTITY,
  ERROR_IDENTITY,
  CLEAR_IDENTITY,
  EDIT_IDENTITY
} from "../actions/type";

const initialState = {
  identity: [],
  editIdentity: {},
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_IDENTITY:
      return {
        ...state,
        identity: payload,
        loading: false
      };
    case EDIT_IDENTITY:
      return {
        ...state,
        loading: false,
        editIdentity: payload
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
        editIdentity: {},
        error: {},
        loading: false
      };
    default:
      return state;
  }
}
