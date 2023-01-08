import axios from "axios";
import {
  CREATE_TOUR_REQUEST,
  CREATE_TOUR_SUCCESS,
  CREATE_TOUR_FAIL,
  GET_TOURS_REQUEST,
  GET_TOURS_SUCCESS,
  GET_TOURS_FAIL,
  GET_TOUR_REQUEST,
  GET_TOUR_SUCCESS,
  GET_TOUR_FAIL,
  GET_USER_TOURS_REQUEST,
  GET_USER_TOURS_SUCCESS,
  GET_USER_TOURS_FAIL,
  DELETE_TOUR_REQUEST,
  DELETE_TOUR_SUCCESS,
  DELETE_TOUR_FAIL,
} from "./types";

export const createTour = (tour, navigate, toast) => async (dispatch) => {
  try {
    let config = {};
    if (localStorage.getItem("profile")) {
      config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("profile")).token,
        },
      };
    }

    dispatch({ type: CREATE_TOUR_REQUEST });
    const res = await axios.post("/api/v1/tours", tour, config);
    toast.success("Tour created successfully");
    navigate("/dashboard");
    dispatch({
      type: CREATE_TOUR_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CREATE_TOUR_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getTours = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TOURS_REQUEST });
    const res = await axios.get("/api/v1/tours");
    dispatch({
      type: GET_TOURS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_TOURS_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getTourById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_TOUR_REQUEST });
    const res = await axios.get("/api/v1/tours/" + id);
    dispatch({
      type: GET_TOUR_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_TOUR_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getTourByUser = (id) => async (dispatch) => {
  try {
    let config = {};
    if (localStorage.getItem("profile")) {
      config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("profile")).token,
        },
      };
    }

    dispatch({ type: GET_USER_TOURS_REQUEST });
    const res = await axios.get("/api/v1/tours/user/" + id, config);
    dispatch({
      type: GET_USER_TOURS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_TOURS_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const deleteTourById = (id, toast) => async (dispatch) => {
  try {
    let config = {};
    if (localStorage.getItem("profile")) {
      config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("profile")).token,
        },
      };
    }

    dispatch({ type: DELETE_TOUR_REQUEST });
    await axios.delete("/api/v1/tours/" + id, config);
    toast.success("Tour deleted Successfully");
    dispatch({
      type: DELETE_TOUR_SUCCESS,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: DELETE_TOUR_FAIL,
      payload: err.response.data.message,
    });
  }
};
