import {
  CREATE_TOUR_REQUEST,
  CREATE_TOUR_SUCCESS,
  CREATE_TOUR_FAIL,
} from "../actions/types";

export const tourRedcuer = (
  state = { tour: {}, tours: [], userTours: [], error: "", loading: false },
  action
) => {
  switch (action.type) {
    case CREATE_TOUR_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case CREATE_TOUR_SUCCESS: {
      return {
        ...state,
        tours: [action.payload],
        error: "",
        loading: false,
      };
    }

    case CREATE_TOUR_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
