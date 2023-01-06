import axios from "axios";
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAIL } from "./types";

export const login = (loginData, navigate, toast) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REQUEST });
    const res = await axios.post("/api/v1/users/signin", loginData);
    localStorage.setItem("profile", res.data);
    toast.success("Login Successfull");
    navigate("/");
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const register = (registerData, navigate, toast) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REQUEST });
    const res = await axios.post("/api/v1/users/signup", registerData);
    localStorage.setItem("profile", res.data);
    toast.success("Register Successfull");
    navigate("/");
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
      payload: err.response.data.message,
    });
  }
};
