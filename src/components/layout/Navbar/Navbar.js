import React, { Fragment } from "react";
import ProfileContext from "../../../context/profile/profileContext";
import { useContext } from "react";
import { useAuth0 } from '../../../utils/auth0/provider'

const Navbar = () => {
  const { user, logout } = useAuth0();
  const { profile } = useContext(ProfileContext);

  return (
    <nav className="navbar navbar-light bg-light">
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
    </nav>
  );
};

export default Navbar;
