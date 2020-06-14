import React, { useContext } from "react";
import AuthContext from "../../../context/auth/authContext";

const Navbar = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);

  const logUserOut = () => {
    logout();
  };

  return (
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#logout" onClick={logUserOut}>
        <i class="fas fa-bars"></i>
      </a>
    </nav>
  );
};

export default Navbar;
