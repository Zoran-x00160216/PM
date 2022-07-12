import {
  GET_USERS,
  EDIT_USERS,
  ERROR_USERS,
  CLEAR_USERS
} from "../actions/type";

const initialState = {
  users: [],
  editUsers: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case EDIT_USERS:
      return {
        ...state,
        loading: false,
        editUsers: payload
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
        loading: false
      };
    default:
      return state;
  }
}
