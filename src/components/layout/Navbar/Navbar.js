import React, { useContext } from "react";
import AuthContext from "../../../context/auth/authContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  const logUserOut = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#logout" onClick={logUserOut}>
        <i className="fas fa-bars"></i>
      </a>
    </nav>
  );
};

export default Navbar;
