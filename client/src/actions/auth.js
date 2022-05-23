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
} from "./type";
import setAuthToken from "../utility/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:5000/api/user/");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Reg User
export const register =
  ({ email, password, tier }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ email, password, tier });

      const res = await axios.post(
        "http://localhost:5000/api/user/register",
        body,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      if (err) {
        dispatch(setAlert(err.response.data, "myDanger"));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Reg User
export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });

    const res = await axios.post(
      "http://localhost:5000/api/user/login",
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    if (err) {
      dispatch(setAlert(err.response.data, "myDanger"));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout user
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_WEB_ACCOUNTS });
  dispatch({ type: CLEAR_TEXT });
  dispatch({ type: CLEAR_NOTES });
  dispatch({ type: CLEAR_CARDS });
  dispatch({ type: CLEAR_IDENTITY });
  dispatch({ type: LOGOUT });
};
