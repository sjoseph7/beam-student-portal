import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  PROFILE_LOADED,
  NO_PROFILE,
  LOGOUT
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    }
    case LOGOUT:
    case AUTH_ERROR:
    case LOGIN_FAIL: {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: false,
        error: action.payload
      };
    }
    case USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    }
    case PROFILE_LOADED: {
      return {
        ...state,
        loadingProfile: false,
        profile: action.payload
      };
    }
    case NO_PROFILE: {
      return {
        ...state,
        loadingProfile: false,
        profile: null
      };
    }
    default: {
      return state;
    }
  }
};
