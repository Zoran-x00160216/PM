import {
  GET_CARDS,
  ERROR_CARDS,
  CLEAR_CARDS,
  EDIT_CARDS,
} from "../actions/type";

const initialState = {
  cards: [],
  editCards: {},
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CARDS:
      return {
        ...state,
        cards: payload,
        loading: false,
      };
    case EDIT_CARDS:
      return {
        ...state,
        loading: false,
        editCards: payload,
      };
    case ERROR_CARDS:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_CARDS:
      return {
        ...state,
        cards: [],
        loading: false,
      };
    default:
      return state;
  }
}
