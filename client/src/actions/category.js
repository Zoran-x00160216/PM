import axios from "axios";
import { setAlert } from "./alert";
import { GET_CATEGORY, ERROR_CATEGORY, EDIT_CATEGORY } from "./type";

// Get web accounts
export const getCategories = () => async dispatch => {
  try {
    const res = await axios.get( `${process.env.REACT_APP_SERVER_URL}/api/category`);
    let data = res.data;

    dispatch({
      type: GET_CATEGORY,
      payload: data
    });

  } catch (err) {
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
      `${process.env.REACT_APP_SERVER_URL}/api/category`,
      formData,
      config
    );
    console.log(res);

    dispatch({
      type: EDIT_CATEGORY,
      payload: res.data
    });

    dispatch(setAlert("Category Created", "mySuccess"));
  } catch (err) {
    if (err) {
      console.log(err);
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

// Update profile
export const editCategory = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/category`,
      formData,
      config
    );
    dispatch({
      type: EDIT_CATEGORY,
      payload: res.data
    });

    dispatch(setAlert("Category Updated", "mySuccess"));
  } catch (err) {
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

// Delete profile
export const deleteCategory = formData => async dispatch => {
  try {

    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/category/${formData._id}`
    );

    dispatch({
      type: EDIT_CATEGORY,
      payload: res.data
    });

    dispatch(setAlert("Note Deleted", "mySuccess"));

  } catch (err) {
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
