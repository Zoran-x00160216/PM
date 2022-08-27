import {
  GET_CATEGORY,
  ERROR_CATEGORY,
  CLEAR_CATEGORY,
  EDIT_CATEGORY
} from "../actions/type";

const initialState = {
  categories: [],
  editStatus: {},
  loading: true,
  error: {}
};

export default function categoryRedux(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORY:
      return {
        ...state,
        categories: payload,
        loading: false,
        editStatus: {}
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        loading: false,
        editStatus: payload
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
        editStatus: {},
        loading: false,
        error: {}
      };
    default:
      return state;
  }
}
