import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAIL } from "../actions/types";

export const authReducer = (
  state = { user: {}, error: "", loading: false },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        error: "",
        loading: false,
      };
    }

    case LOGIN_FAIL: {
      return {
        ...state,
        user: {},
        loading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
