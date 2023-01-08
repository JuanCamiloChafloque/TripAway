import axios from "axios";
import {
  CREATE_TOUR_REQUEST,
  CREATE_TOUR_SUCCESS,
  CREATE_TOUR_FAIL,
} from "./types";

export const createTour = (tour, navigate, toast) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TOUR_REQUEST });
    const res = await axios.post("/api/v1/tours", tour);
    toast.success("Tour created successfully");
    navigate("/");
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
