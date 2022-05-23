import {
  GET_WEB_ACCOUNTS,
  ERROR_WEB_ACCOUNTS,
  CLEAR_WEB_ACCOUNTS,
  EDIT_WEB_ACCOUNT,
} from "../actions/type";

const initialState = {
  webAccounts: [],
  editAccount: {},
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WEB_ACCOUNTS:
      return {
        ...state,
        webAccounts: payload,
        loading: false,
      };
    case EDIT_WEB_ACCOUNT:
      return {
        ...state,
        loading: false,
        editAccount: payload,
      };
    case ERROR_WEB_ACCOUNTS:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_WEB_ACCOUNTS:
      return {
        ...state,
        webAccounts: [],
        loading: false,
      };
    default:
      return state;
  }
}
