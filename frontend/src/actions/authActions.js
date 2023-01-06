import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from "./types";

export const login = (loginData, navigate, toast) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const res = await axios.post("/api/v1/users/signin", loginData);
    localStorage.setItem("profile", res.data);
    toast.success("Login Successfull");
    navigate("/");
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.message,
    });
  }
};
