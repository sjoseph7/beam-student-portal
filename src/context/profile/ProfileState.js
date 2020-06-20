import React, { useReducer } from "react";
import ProfileContext from "./profileContext";
import profileReducer from "./profileReducer";
import axios from "axios";
import { PROFILE_LOADED, NO_PROFILE } from "../types";
import { useAuth0 } from "../../react-auth0-spa";

const ProfileState = props => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
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

  // Clear Errors
  return (
    <ProfileContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        loadingProfile: state.loadingProfile,
        user: state.user,
        profile: state.profile,
        error: state.error,
        loadUserProfile
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;

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
