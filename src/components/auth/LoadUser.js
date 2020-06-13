import React, { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../context/auth/authContext";

const LoadUser = () => {
  const {
    loadUser,
    loadUserProfile,
    loading,
    user,
    loadingProfile,
    profile
  } = useContext(AuthContext);

  useEffect(() => {
    if (loading) {
      loadUser();
    }
    if (!loading && user && loadingProfile) {
      loadUserProfile();
      console.debug("loading profile!");
    }
    if (!loadingProfile && profile) {
      console.debug("profile loaded!");
    }

    //eslint-disable-next-line
  }, [loading, user, loadingProfile, profile]);

  return <div></div>;
};

export default LoadUser;
