import axios from "axios";
import { setAlert } from "./alert";
import { GET_CATEGORY, ERROR_CATEGORY, EDIT_CATEGORY } from "./type";

// Get categories
export const getCategories = () => async dispatch => {
  try {
    const res = await axios.get( `/api/category`);
    let data = res.data;

    // dispatch to redux store
    dispatch({
      type: GET_CATEGORY,
      payload: data
    });

  } catch (err) {
    // if err dispatch to redux store
    dispatch({
      type: ERROR_CATEGORY,
      payload: {
        msg: err.response
      }
    });
  }
};

// Create category
export const createCategory = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post(
      `/api/category`,
      formData,
      config
    );

    // dispatch to redux store
    dispatch({
      type: EDIT_CATEGORY,
      payload: res.data
    });

    // dispaly status 
    dispatch(setAlert("Category Created", "mySuccess"));

  } catch (err) {
    if (err) {
      // if err dispatch to redux store
      dispatch(setAlert(err.response.data, "myDanger"));
    }

    dispatch({
      type: ERROR_CATEGORY,
      payload: {
        msg: err.response
        // status: err.response.status
      }
    });
  }
};

// Update category
export const editCategory = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(
      `/api/category`,
      formData,
      config
    );

    // dispatch to redux store
    dispatch({
      type: EDIT_CATEGORY,
      payload: res.data
    });

    // dispaly status 
    dispatch(setAlert("Category Updated", "mySuccess"));
  } catch (err) {
    // if err dispatch to redux store
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
    }

    dispatch({
      type: ERROR_CATEGORY,
      payload: {
        msg: err.response,
        status: err.response.status
      }
    });
  }
};

// Delete category
export const deleteCategory = formData => async dispatch => {
  try {

    const res = await axios.delete(
      `/api/category/${formData._id}`
    );

    // dispatch to redux store
    dispatch({
      type: EDIT_CATEGORY,
      payload: res.data
    });

    // dispaly status
    dispatch(setAlert("Note Deleted", "mySuccess"));

  } catch (err) {
    // if err dispatch to redux store
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));

      dispatch({
        type: ERROR_CATEGORY,
        payload: {
          msg: err.response,
          status: err.response.status
        }
      });
    }

   
  }
};
