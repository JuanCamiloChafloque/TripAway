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

    case GET_TOURS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_TOURS_SUCCESS: {
      return {
        ...state,
        tours: action.payload,
        error: "",
        loading: false,
      };
    }

    case GET_TOURS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case GET_TOUR_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_TOUR_SUCCESS: {
      return {
        ...state,
        tour: action.payload,
        error: "",
        loading: false,
      };
    }

    case GET_TOUR_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case GET_USER_TOURS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_USER_TOURS_SUCCESS: {
      return {
        ...state,
        userTours: action.payload,
        error: "",
        loading: false,
      };
    }

    case GET_USER_TOURS_FAIL: {
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
