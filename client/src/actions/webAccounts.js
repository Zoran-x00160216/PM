import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_WEB_ACCOUNTS,
  EDIT_WEB_ACCOUNTS,
  ERROR_WEB_ACCOUNTS
} from "./type";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

// Get web accounts
export const getWebAccounts = text => async dispatch => {
  // console.log(text);
  try {
    // const url = process.env.SERVER_URL;
    // console.log(url);
    const res = await axios.get("http://localhost:5000/api/webAccounts");

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

// Create or update profile
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
      "http://localhost:5000/api/webAccounts",
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

// Update profile
export const editWebAccount = (formData, text) => async dispatch => {
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
    // console.log(data);

    const res = await axios.put(
      "http://localhost:5000/api/webAccounts",
      formData,
      config
    );

    dispatch({
      type: EDIT_WEB_ACCOUNTS,
      payload: res.data
    });

    dispatch(setAlert("Account Updated", "mySuccess"));

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

// Delete profile
export const deleteWebAccount = formData => async dispatch => {
  try {

    const res = await axios.delete(
      `http://localhost:5000/api/webAccounts/${formData._id}`
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
