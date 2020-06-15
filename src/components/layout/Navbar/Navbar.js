import React, { useContext } from "react";
import AuthContext from "../../../context/auth/authContext";

const Navbar = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);

  const logUserOut = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#yummy-hamburger">
        <i class="fas fa-bars"></i>
      </a>
      {isAuthenticated && (
        <a className="text-reset ml-auto" href="#logout" onClick={logUserOut}>
          Logout <i class="fas fa-sign-out-alt"></i>
        </a>
      )}
    </nav>
  );
};

export default Navbar;
