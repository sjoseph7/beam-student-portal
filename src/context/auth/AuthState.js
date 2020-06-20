import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import { PROFILE_LOADED, NO_PROFILE, LOGOUT } from "../types";
import { useAuth0 } from "../../react-auth0-spa";

const AuthState = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { user, getTokenSilently } = useAuth0();

  // Load User Profile
  const loadUserProfile = async () => {
    try {
      const userId = user.sub.split("|")[1];
      const userProfileEndpoint = `${process.env.REACT_APP_PORTAL_API_BASE_URL}/people/${userId}`;

      const token = await getTokenSilently();
      const response = await axios.get(userProfileEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch({ type: PROFILE_LOADED, payload: response.data.data });
    } catch (err) {
      console.error(err);
      dispatch({ type: NO_PROFILE });
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
        logout,
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
