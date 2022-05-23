import axios from "axios";
import { setAlert } from "./alert";
import { GET_NOTES, ERROR_NOTES } from "./type";
import CryptoJS from "crypto-js";

// Get web accounts
export const getNotes = (text) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/secretNotes");
    let data = res.data;

    // Decrypt
    for (let d = 0; d < data.length; d++) {
      let bytes = CryptoJS.AES.decrypt(data[d].note, text);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      data[d].note = originalText;
    }

    dispatch({
      type: GET_NOTES,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_NOTES,
      payload: {
        msg: err.response,
        // status: err.response.status,
      },
    });
  }
};

// Create or update profile
export const createNote = (formData, text) => async (dispatch) => {
  try {
    // encrypt note
    let data = formData;
    const encrypted = CryptoJS.AES.encrypt(data.note, text).toString();
    data.note = encrypted;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      "http://localhost:5000/api/secretNotes",
      data,
      config
    );

    dispatch({
      type: GET_NOTES,
      payload: res.data,
    });

    dispatch(setAlert("Note Created", "mySuccess"));
  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
    }

    dispatch({
      type: ERROR_NOTES,
      payload: {
        msg: err.response,
        status: err.response.status,
      },
    });
  }
};

// Update profile
export const editNote = (formData, text) => async (dispatch) => {
  try {
    // encrypt note
    let data = formData;
    const encrypted = CryptoJS.AES.encrypt(data.note, text).toString();
    data.note = encrypted;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      "http://localhost:5000/api/secretNotes",
      data,
      config
    );
    dispatch({
      type: GET_NOTES,
      payload: res.data,
    });

    dispatch(setAlert("Note Updated", "mySuccess"));
  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
    }

    dispatch({
      type: ERROR_NOTES,
      payload: {
        msg: err.response,
        status: err.response.status,
      },
    });
  }
};

// Delete profile
export const deleteNote = (formData) => async (dispatch) => {
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const res = await axios.delete(
      `http://localhost:5000/api/secretNotes/${formData._id}`
    );
    // console.log(res.data);

    dispatch({
      type: GET_NOTES,
      payload: res.data,
    });

    dispatch(setAlert("Note Deleted", "mySuccess"));
  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
    }

    dispatch({
      type: ERROR_NOTES,
      payload: {
        msg: err.response,
        status: err.response.status,
      },
    });
  }
};
