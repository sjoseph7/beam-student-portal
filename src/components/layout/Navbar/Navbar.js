import React, { Fragment } from "react";
import { useAuth0 } from "../../../react-auth0-spa";
import ProfileContext from "../../../context/profile/profileContext";
import { useContext } from "react";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { profile } = useContext(ProfileContext);

  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#yummy-hamburger">
        <i className="fas fa-bars"></i>
      </a>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && (
        <Fragment>
          {profile && (
            <a
              href="#hi-nice-to-meet-you"
              className="text-reset ml-auto text-decoration-none"
            >
              Welcome, {profile.firstName}!
            </a>
          )}
          <a
            className="text-reset ml-3"
            href="#good-bye👋🏾"
            onClick={() => logout()}
          >
            Logout <i className="fas fa-sign-out-alt"></i>
          </a>
        </Fragment>
      )}
    </nav>
  );
};

export default Navbar;
