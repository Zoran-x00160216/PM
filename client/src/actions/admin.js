import axios from "axios";
import { GET_USERS, ERROR_USERS, EDIT_USERS } from "./type";
import { setAlert } from "./alert";
 
// Load Users
export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/admin/`);

    dispatch({
      type: GET_USERS,
      payload: res.data
    });

  } catch (err) {
    if(err) {
    dispatch({
      type: ERROR_USERS,
      payload: {
        msg: err.response,
        status: err.response.status
      }
    });
  }
};
}

// Delete profile
export const deleteUser = id => async dispatch => {
  try {

    const res = await axios.delete( `${process.env.REACT_APP_SERVER_URL}/api/admin/${id}`);
    console.log(res.data);

    dispatch({
      type: EDIT_USERS,
      payload: res.data
    });

    dispatch(setAlert("Account Deleted", "mySuccess"));

  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));

      dispatch({
        type: ERROR_USERS,
        payload: {
          msg: err.response,
          status: err.response.status
        }
      });
    }

  }
};

// Get sum of all entries per collection in db
export const getAllEntries = () => async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/admin/count`);
    const data = JSON.stringify(res.data);

    return data;
  } catch (err) {
    return err.response;
  }
};

// Get sum of all basic and premium accounts in db
export const getUsersCount = () => async () => {
  try {
    const res = await axios.get( `${process.env.REACT_APP_SERVER_URL}/api/admin/sumusers`);
    const data = JSON.stringify(res.data);

    return data;
  } catch (err) {
    return err.response;
  }
};

// Get sum of all entries per collection where accessLevel=premium
export const getPremiumAllEntries = () => async () => {
  try {
    const res = await axios.get( `${process.env.REACT_APP_SERVER_URL}/api/admin/allpremium`);
    const data = JSON.stringify(res.data);

    return data;
  } catch (err) {
    return err.response;
  }
};

// Get sum of all entries per collection where accessLevel=basic
export const getBasicAllEntries = () => async () => {
  try {
    const res = await axios.get( `${process.env.REACT_APP_SERVER_URL}/api/admin/allbasic`);
    const data = JSON.stringify(res.data);

    return data;
  } catch (err) {
    return err.response;
  }
};
