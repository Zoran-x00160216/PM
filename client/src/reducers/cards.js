import {
  GET_CARDS,
  ERROR_CARDS,
  CLEAR_CARDS,
  EDIT_CARDS
} from "../actions/type";

const initialState = {
  cards: [],
  editStatus: {},
  loading: true,
  error: {}
};

export default function cards(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CARDS:
      return {
        ...state,
        cards: payload,
        loading: false,
        editStatus: {}
      };
    case EDIT_CARDS:
      return {
        ...state,
        loading: false,
        editStatus: payload
      };
    case ERROR_CARDS:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_CARDS:
      return {
        ...state,
        cards: [],
        editStatus: {},
        loading: false
      };
    default:
      return state;
  }
}
