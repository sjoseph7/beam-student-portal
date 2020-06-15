import React, { useContext } from "react";
import AuthContext from "../../../context/auth/authContext";

const Navbar = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);

  const logUserOut = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#logout" onClick={logUserOut}>
        <i class="fas fa-bars"></i>
      </a>
      {isAuthenticated && (
        <a
          className="text-reset ml-auto mr-0 pr-0"
          href="#yummy-hamburger"
          onClick={logUserOut}
        >
          <i class="fas fa-sign-out-alt"></i>
        </a>
      )}
    </nav>
  );
};

export default Navbar;
