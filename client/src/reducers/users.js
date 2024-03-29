import {
  GET_USERS,
  EDIT_USERS,
  ERROR_USERS,
  CLEAR_USERS
} from "../actions/type";

const initialState = {
  users: [],
  editStatus: [],
  loading: true,
  status: 0,
  error: {}
};

export default function users(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        editStatus: {},
        loading: false
      };
    case EDIT_USERS:
      return {
        ...state,
        loading: false,
        editStatus: payload
      };
    case ERROR_USERS:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        editStatus: {},
        loading: false
      };
    default:
      return state;
  }
}
