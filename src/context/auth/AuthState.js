import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  PROFILE_LOADED,
  NO_PROFILE,
  LOGOUT
} from "../types";
import { setAuthToken } from "../../utils/auth";

const AuthState = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const detailsEndpoint = `${process.env.REACT_APP_PORTAL_API_BASE_URL}/auth/details`;
      const response = await axios.get(detailsEndpoint);

      dispatch({ type: USER_LOADED, payload: response.data.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Load User Profile
  const loadUserProfile = async () => {
    try {
      const userProfileEndpoint = `${process.env.REACT_APP_PORTAL_API_BASE_URL}/people/${state.user._dbRef}`;
      const response = await axios.get(userProfileEndpoint);

      dispatch({ type: PROFILE_LOADED, payload: response.data.data });
    } catch (err) {
      dispatch({ type: NO_PROFILE });
    }
  };

  // Login User
  const login = async credentials => {
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const loginEndpoint = `${process.env.REACT_APP_PORTAL_API_BASE_URL}/auth/login`;
      const response = await axios.post(loginEndpoint, credentials, config);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      await loadUser();
    } catch (err) {
      console.debug(err.response.data);
      dispatch({ type: LOGIN_FAIL, payload: "Error" });
    }
  };
  // Logout
  const logout = async () => {
    try {
      const logoutEndpoint = `${process.env.REACT_APP_PORTAL_API_BASE_URL}/auth/logout`;
      const response = await axios.post(logoutEndpoint);
      dispatch({ type: LOGOUT, payload: response.data });
    } catch (err) {}
  };

  // Clear Errors
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        loadingProfile: state.loadingProfile,
        user: state.user,
        profile: state.profile,
        error: state.error,
        login,
        logout,
        loadUser,
        loadUserProfile
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

// ==== INITIAL STATES ==== //
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  loadingProfile: true,
  error: null,
  user: null,
  profile: null
};
