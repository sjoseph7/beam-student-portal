import React, { useEffect } from "react";
import { useAuth0 } from "../../../react-auth0-spa";
import { Redirect } from "react-router-dom";

const LandingPage = () => {
  const { isAuthenticated, loginWithRedirect, user, loading } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      loginWithRedirect({ appState: { targetUrl: "/dashboard" } });
    }
    //eslint-disable-next-line
  }, [isAuthenticated, user, loading]);

  return (
    <div>
      {isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <div>You will be redirected shortly...</div>
      )}
    </div>
  );
};

export default LandingPage;
