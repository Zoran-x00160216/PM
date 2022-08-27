import axios from "axios";
import { GET_USERS, ERROR_USERS, EDIT_USERS } from "./type";
import { setAlert } from "./alert";
 
// Load Users
export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get(`/api/admin/`);

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

    const res = await axios.delete( `/api/admin/${id}`);

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


// Add Admin
export const createAdmin = ({ email, password }) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ email, password });

    const res = await axios.post(
      `/api/admin/createAdmin`,
      body,
      config
    );
    
    dispatch(setAlert(res.data, "mySuccess"));  
    dispatch(getUsers());

  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
    }
  }
};


// call API to send a email warning to user
export const sendEmailWarning = email => async dispatch => {
  try {

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    
    const body = JSON.stringify({ email });

    const res = await axios.post( `/api/admin/warningEmail`,     body,
    config);
   
    (res.status === 200 &&
    dispatch(setAlert("Email Sent", "mySuccess")));


  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
    }
  }
};


// Load Users
export const getPremiumPrice = () => async () => {
  try {
    const res = await axios.get(`/api/auth/getPremiumPrice`);

    return res.data;

  } catch (err) {
    if(err) {
    return err.response
  }
};
}
// Delete profile
export const setPremiumPrice = price => async dispatch  => {

  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    
    const body = JSON.stringify({ price });

    const res = await axios.put(`/api/admin/updatePremiumPrice`,
    body,
    config);
    
    (res.status === 200 &&
    dispatch(setAlert("Price Set", "mySuccess")));

  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
    }
  }
};


// Get sum of all entries per collection in db
export const getAllEntries = () => async () => {
  try {
    const res = await axios.get(`/api/admin/count`);
    const data = JSON.stringify(res.data);

    return data;
  } catch (err) {
    return err.response;
  }
};


// Get sum of all basic and premium accounts in db
export const getUsersCount = () => async () => {
  try {
    const res = await axios.get( `/api/admin/sumusers`);
    const data = JSON.stringify(res.data);

    return data;
  } catch (err) {
    return err.response;
  }
};


// Get sum of all entries per collection where accessLevel=premium
export const getPremiumAllEntries = () => async () => {
  try {
    const res = await axios.get( `/api/admin/allpremium`);
    const data = JSON.stringify(res.data);

    return data;
  } catch (err) {
    return err.response;
  }
};


// Get sum of all entries per collection where accessLevel=basic
export const getBasicAllEntries = () => async () => {
  try {
    const res = await axios.get( `/api/admin/allbasic`);
    const data = JSON.stringify(res.data);

    return data;
  } catch (err) {
    return err.response;
  }
};
