import {
  GET_WEB_ACCOUNTS,
  ERROR_WEB_ACCOUNTS,
  CLEAR_WEB_ACCOUNTS,
  EDIT_WEB_ACCOUNTS
} from "../actions/type";

const initialState = {
  webAccounts: [],
  editStatus: {},
  status: 0,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WEB_ACCOUNTS:
      return {
        ...state,
        webAccounts: payload,
        editStatus: {},
        loading: false
      };
    case EDIT_WEB_ACCOUNTS:
      return {
        ...state,
        loading: false,
        editStatus: payload
      };
    case ERROR_WEB_ACCOUNTS:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_WEB_ACCOUNTS:
      return {
        ...state,
        webAccounts: [],
        editAccount: {},
        error: {},
        loading: false
      };
    default:
      return state;
  }
}
