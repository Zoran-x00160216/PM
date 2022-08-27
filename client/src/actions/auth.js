import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_WEB_ACCOUNTS,
  CLEAR_TEXT,
  CLEAR_CARDS,
  CLEAR_NOTES,
  CLEAR_IDENTITY,
  CLEAR_USERS
} from "./type";
import setAuthToken from "../utility/setAuthToken";
import jwtDecode from "jwt-decode";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/api/auth`);

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

  } catch (err) {
    if(err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
    }
};

// Reg User
export const register = ({ email, password }) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ email, password });

    const res = await axios.post(
      `/api/auth/register`,
      body,
      config
    );

    const token = res.data.token;
    const tokenData = jwtDecode(token);
    const data = { token, tokenData };

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    });

    dispatch(loadUser());

  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));

      dispatch({
        type: REGISTER_FAIL
      });
    }
  }
};

// Reg User
export const login = (email, password) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ email, password });

    const res = await axios.post(
      `/api/auth/login`,
      body,
      config
    );

    const token = res.data.token;
    const tokenData = jwtDecode(token);
    const data = { token, tokenData };

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    });

    dispatch(loadUser());

  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
      dispatch({
        type: LOGIN_FAIL
      });
    }

  }
};

// Update user master password
export const updateUserPassword = (password) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    console.log(password);
    const body = JSON.stringify({ password });

    await axios.put(
      `/api/updateUser`,
      body,
      config
    );
    
   dispatch(setAlert("Master Password Updated", "mySuccess"))

    dispatch(loadUser());
  } catch (err) {
    if (err) {
      // console.log(err.response.data);
      dispatch(setAlert(err.response.data, "myDanger"));
    }
  }
};

// Update user master password
export const updateUserTier = (tier) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ tier });

    await axios.put(
      `/api/updateUser/tier`,
     body,
      config 
    );
    
    setTimeout(() => dispatch(setAlert("Premium Account Enabled", "mySuccess")), 2000);

    dispatch(loadUser());
  } catch (err) {
    if (err) {
      // console.log(err.response.data);
      dispatch(setAlert(err.response.data, "myDanger"));
    }
  }
};


// Logout user
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_WEB_ACCOUNTS });
  dispatch({ type: CLEAR_TEXT });
  dispatch({ type: CLEAR_NOTES });
  dispatch({ type: CLEAR_CARDS });
  dispatch({ type: CLEAR_IDENTITY });
  dispatch({ type: CLEAR_USERS });
  dispatch({ type: LOGOUT });
};
