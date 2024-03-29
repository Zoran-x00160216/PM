import axios from "axios";
import { setAlert } from "./alert";
import { GET_CARDS, ERROR_CARDS, EDIT_CARDS } from "./type";
import CryptoJS from "crypto-js";

// Get web accounts
export const getCards = text => async dispatch => {
  try {
    const res = await axios.get( `/api/creditCards`);

    let data = res.data;
    // Decrypt cards data
    for (let d = 0; d < data.length; d++) {
      let bytes = CryptoJS.AES.decrypt(data[d].number, text);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      data[d].number = originalText;
    }

    // dispatch to redux store
    dispatch({
      type: GET_CARDS,
      payload: data
    });

  } catch (err) {
    // if err dispatch to redux store
    if(err) {
      dispatch({
        type: ERROR_CARDS,
        payload: {
          msg: err.response
        }
      });
    }
  }
};

// Create or update profile
export const createCard = (formData, text) => async dispatch => {
  try {
    // encrypt card data
    let data = formData;
    const encrypted = CryptoJS.AES.encrypt(data.number, text).toString();
    data.number = encrypted;

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post(
      `/api/creditCards`,
      data,
      config
    );
    // dispatch to redux store
    dispatch({
      type: EDIT_CARDS,
      payload: res.data
    });

    // dispaly status 
    dispatch(setAlert("Account Created", "mySuccess"));
  } catch (err) {
    // if err dispatch to redux store
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));

      dispatch({
        type: ERROR_CARDS,
        payload: {
          msg: err.response,
          status: err.response.status
        }
      });
    }
  }
};

// Update card details
export const editCard = (formData, text, alertControler) => async dispatch => {
  try {
    // encrypt card number
    let data = formData;
    const encrypted = CryptoJS.AES.encrypt(data.number, text).toString();
    data.number = encrypted;

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(
      `/api/creditCards`,
      data,
      config
    );
    // dispatch to redux store
    dispatch({
      type: EDIT_CARDS,
      payload: res.data
    });

    // dispaly status 
    (alertControler && dispatch(setAlert("Card Updated", "mySuccess")));
    
  } catch (err) {
    // if err dispatch to redux store
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));

      dispatch({
        type: ERROR_CARDS,
        payload: {
          msg: err.response,
          status: err.response.status
        }
      });
    }
  }
};

// Delete profile
export const deleteCard = formData => async dispatch => {
  try {
    const res = await axios.delete(
      `/api/creditCards/${formData._id}`
    );

    // dispatch to redux store
    dispatch({
      type: EDIT_CARDS,
      payload: res.data
    });

    dispatch(setAlert("Account Deleted", "mySuccess"));

  } catch (err) {
    // if err dispatch to redux store
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));

    dispatch({
      type: ERROR_CARDS,
      payload: {
        msg: err.response,
        status: err.response.status
      }
    });
  }
  }
};
