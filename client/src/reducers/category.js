import {
  GET_CATEGORY,
  ERROR_CATEGORY,
  CLEAR_CATEGORY,
  EDIT_CATEGORY
} from "../actions/type";

const initialState = {
  categories: [],
  editCategories: {},
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORY:
      return {
        ...state,
        categories: payload,
        loading: false
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        loading: false,
        editCategories: payload
      };
    case ERROR_CATEGORY:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_CATEGORY:
      return {
        ...state,
        categories: [],
        loading: false
      };
    default:
      return state;
  }
}
