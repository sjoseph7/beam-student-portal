import React from "react";
import { useAuth0 } from '../../../context/auth0'
import { useProfile } from "../../../context/profile";

const Navbar = () => {
  const { logout } = useAuth0();
  const { profile } = useProfile();

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
