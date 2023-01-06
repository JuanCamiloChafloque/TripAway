import { AUTH_SUCCESS, AUTH_REQUEST, AUTH_FAIL } from "../actions/types";

export const authReducer = (
  state = { user: {}, error: "", loading: false },
  action
) => {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case AUTH_SUCCESS: {
      return {
        user: action.payload,
        error: "",
        loading: false,
      };
    }

    case AUTH_FAIL: {
      return {
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
