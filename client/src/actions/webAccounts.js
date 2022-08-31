import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_WEB_ACCOUNTS,
  EDIT_WEB_ACCOUNTS,
  ERROR_WEB_ACCOUNTS
} from "./type";
import CryptoJS from "crypto-js";
g();

// Get web accounts
export const getWebAccounts = text => async dispatch => {
  try {
    const res = await axios.get(`/api/webAccounts`);

    // Decrypt
    let data = res.data;
    for (let d = 0; d < data.length; d++) {
      let bytes = CryptoJS.AES.decrypt(data[d].password, text);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      data[d].password = originalText;
    }

    dispatch({
      type: GET_WEB_ACCOUNTS,
      payload: data
    })

  } catch (err) {
    if(err) {
    dispatch({
      type: ERROR_WEB_ACCOUNTS,
      payload: {
        msg: err.response
      }
    });
  }
  }
};

// Create webAccount and dispatch data to redux store
export const createWebAccount = (formData, text) => async dispatch => {
  try {
    // encrypt password
    let data = formData;
    const encrypted = CryptoJS.AES.encrypt(data.password, text).toString();
    data.password = encrypted;

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(
      `/api/webAccounts`,
      data,
      config
    );
    
    dispatch({
      type: EDIT_WEB_ACCOUNTS,
      payload: res.data
    });

    dispatch(setAlert("Account Created", "mySuccess"));
    
  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
      dispatch({
        type: ERROR_WEB_ACCOUNTS,
        payload: {
          msg: err.response,
          status: err.response.status
        }
      });
    }


  }
};

// Update webAccount and dispatch data to redux store
export const editWebAccount = (formData, text, alertControler) => async dispatch => {
  try {
    
    // encrypt password
    let data = formData;
    const encrypted = CryptoJS.AES.encrypt(data.password, text).toString();
    data.password = encrypted;  

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }; 

    const res = await axios.put(
      `/api/webAccounts`,
      formData,
      config
    );

    dispatch({
      type: EDIT_WEB_ACCOUNTS,
      payload: res.data
    });


    (alertControler && dispatch(setAlert("Account Updated", "mySuccess")));

  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
      dispatch({
        type: ERROR_WEB_ACCOUNTS,
        payload: {
          msg: err.response,
          status: err.response.status
        }
      });
    }

   
  }
};

// Delete account
export const deleteWebAccount = formData => async dispatch => {
  try {

    const res = await axios.delete(
      `/api/webAccounts/${formData._id}`
    );

    
    dispatch({
      type: EDIT_WEB_ACCOUNTS,
      payload: res.data
    });

    dispatch(setAlert("Account Deleted", "mySuccess"));

  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
      dispatch({
        type: ERROR_WEB_ACCOUNTS,
        payload: {
          msg: err.response,
          status: err.response.status
        }
      });
    }


  }
};
