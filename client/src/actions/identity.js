import axios from "axios";
import { setAlert } from "./alert";
import { GET_IDENTITY, ERROR_IDENTITY } from "./type";
import CryptoJS from "crypto-js";

// Get web accounts
export const getIdentity = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/identity");

    dispatch({
      type: GET_IDENTITY,
      payload: res.data,
    });
    // console.log(res.data);
  } catch (err) {
    dispatch({
      type: ERROR_IDENTITY,
      payload: {
        msg: err.response,
        status: err.response.status,
      },
    });
  }
};

// Create or update profile
export const createIdentity = (formData, text) => async (dispatch) => {
  try {
    console.log(text, formData);
    // encrypt identity details
    let data = formData;
    console.log(data);

    // data.map((d) => {
    //   console.log(data[d]);
    // let encrypt = CryptoJS.AES.encrypt(data[d], text).toString();
    // console.log(data[d], encrypt);
    // data[d] = encrypt;
    // });
    // console.log(data);
    // const encryptedPPS = CryptoJS.AES.encrypt(data.PPS, text).toString();
    // const encryptedPassport = CryptoJS.AES.encrypt(
    //   data.passportNum,
    //   text
    // ).toString();
    // const encryptedDrivingLic = CryptoJS.AES.encrypt(
    //   data.drivingLicense,
    //   text
    // ).toString();
    // const encryptedPhoneHome = CryptoJS.AES.encrypt(
    //   data.phoneHome,
    //   text
    // ).toString();
    // const encryptedPhoneMobile = CryptoJS.AES.encrypt(
    //   data.phoneMobile,
    //   text
    // ).toString();
    // const encryptedAddress = CryptoJS.AES.encrypt(
    //   data.addressStreet,
    //   text
    // ).toString();

    // data.PPS = encryptedPPS;
    // data.passportNum = encryptedPassport;
    // data.drivingLicense = encryptedDrivingLic;
    // data.phoneHome = encryptedPhoneHome;
    // data.phoneMobile = encryptedPhoneMobile;
    // data.addressStreet = encryptedAddress;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      "http://localhost:5000/api/identity",
      formData,
      config
    );

    dispatch({
      type: GET_IDENTITY,
      payload: res.data,
    });

    dispatch(setAlert("Account Created", "mySuccess"));
  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
    }

    dispatch({
      type: ERROR_IDENTITY,
      payload: {
        msg: err.response,
        status: err.response.status,
      },
    });
  }
};

// Update profile
export const editIdentity = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      "http://localhost:5000/api/identity",
      formData,
      config
    );
    dispatch({
      type: GET_IDENTITY,
      payload: res.data,
    });

    dispatch(setAlert("Account Updated", "mySuccess"));
  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
    }

    dispatch({
      type: ERROR_IDENTITY,
      payload: {
        msg: err.response,
        status: err.response.status,
      },
    });
  }
};

// Delete profile
export const deleteIdentity = (formData) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/identity/${formData._id}`
    );
    // console.log(res.data);

    dispatch({
      type: GET_IDENTITY,
      payload: res.data,
    });

    dispatch(setAlert("Account Deleted", "mySuccess"));
  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
    }

    dispatch({
      type: ERROR_IDENTITY,
      payload: {
        msg: err.response,
        status: err.response.status,
      },
    });
  }
};
