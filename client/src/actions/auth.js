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
    const res = await axios.get("http://localhost:5000/api/auth");

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
export const register = ({ email, password, tier }) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({ email, password, tier });

    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
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
      "http://localhost:5000/api/auth/login",
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

// Update user account
export const updateUser = ({password}) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify({ password });

    const res = await axios.put(
      "http://localhost:5000/api/updateUser",
      body,
      config
    );
    
    setTimeout(() => dispatch(setAlert(res.data.message, "mySuccess")), 2000);

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
