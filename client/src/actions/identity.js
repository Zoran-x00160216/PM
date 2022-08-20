import axios from "axios";
import { setAlert } from "./alert";
import { GET_IDENTITY, ERROR_IDENTITY, EDIT_IDENTITY } from "./type";
import CryptoJS from "crypto-js";

// Get web accounts
export const getIdentity = text => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/identity`);

    let data = res.data;
    // Decrypt
    for (let d = 0; d < data.length; d++) {
      let bytes1 = CryptoJS.AES.decrypt(data[d].PPS, text);
      let originalText1 = bytes1.toString(CryptoJS.enc.Utf8);
      data[d].PPS = originalText1;

      let bytes2 = CryptoJS.AES.decrypt(data[d].passportNum, text);
      let originalText2 = bytes2.toString(CryptoJS.enc.Utf8);
      data[d].passportNum = originalText2;

      let bytes3 = CryptoJS.AES.decrypt(data[d].drivingLicense, text);
      let originalText3 = bytes3.toString(CryptoJS.enc.Utf8);
      data[d].drivingLicense = originalText3;

      let bytes4 = CryptoJS.AES.decrypt(data[d].phoneHome, text);
      let originalText4 = bytes4.toString(CryptoJS.enc.Utf8);
      data[d].phoneHome = originalText4;

      let bytes5 = CryptoJS.AES.decrypt(data[d].phoneMobile, text);
      let originalText5 = bytes5.toString(CryptoJS.enc.Utf8);
      data[d].phoneMobile = originalText5;

      let bytes6 = CryptoJS.AES.decrypt(data[d].addressStreet, text);
      let originalText6 = bytes6.toString(CryptoJS.enc.Utf8);
      data[d].addressStreet = originalText6;
    }

    dispatch({
      type: GET_IDENTITY,
      payload: res.data
    });

  } catch (err) {
    if(err) {
    dispatch({
      type: ERROR_IDENTITY,
      payload: {
        msg: err.response,
      }
    });
  }
  }
};

// Create or update profile
export const createIdentity = (formData, text) => async dispatch => {
  try {

    // encrypt identity details
    let data = formData;
    // data.forEach(d => {
    //   console.log(data[d]);
    //   let encrypt = CryptoJS.AES.encrypt(data[d], text).toString();
    //   console.log(data[d], encrypt);
    //   data[d] = encrypt;
    // });
    const encryptedPPS = CryptoJS.AES.encrypt(data.PPS, text).toString();
    const encryptedPassport = CryptoJS.AES.encrypt(
      data.passportNum,
      text
    ).toString();
    const encryptedDrivingLic = CryptoJS.AES.encrypt(
      data.drivingLicense,
      text
    ).toString();
    const encryptedPhoneHome = CryptoJS.AES.encrypt(
      data.phoneHome,
      text
    ).toString();
    const encryptedPhoneMobile = CryptoJS.AES.encrypt(
      data.phoneMobile,
      text
    ).toString();
    const encryptedAddress = CryptoJS.AES.encrypt(
      data.addressStreet,
      text
    ).toString();

    data.PPS = encryptedPPS;
    data.passportNum = encryptedPassport;
    data.drivingLicense = encryptedDrivingLic;
    data.phoneHome = encryptedPhoneHome;
    data.phoneMobile = encryptedPhoneMobile;
    data.addressStreet = encryptedAddress;

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/identity`,
      data,
      config
    );

    dispatch({
      type: EDIT_IDENTITY,
      payload: res.data
    });

    dispatch(setAlert("Account Created", "mySuccess"));

  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
      dispatch({
        type: ERROR_IDENTITY,
        payload: {
          msg: err.response,
          status: err.response.status
        }
      });
    }

   
  }
};

// Update profile
export const editIdentity = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/identity`,
      formData,
      config
    );

    dispatch({
      type: EDIT_IDENTITY,
      payload: res.data
    });

    dispatch(setAlert("Account Updated", "mySuccess"));
  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
      dispatch({
        type: ERROR_IDENTITY,
        payload: {
          msg: err.response,
          status: err.response.status
        }
      });
    }

    
  }
};

// Delete profile
export const deleteIdentity = formData => async dispatch => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/identity/${formData._id}`
    );
    // console.log(res.data);

    dispatch({
      type: EDIT_IDENTITY,
      payload: res.data
    });

    dispatch(setAlert("Account Deleted", "mySuccess"));
  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
      dispatch({
        type: ERROR_IDENTITY,
        payload: {
          msg: err.response,
          status: err.response.status
        }
      });
    }

    
  }
};
