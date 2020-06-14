import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { useEffect } from "react";

const Login = props => {
  // User State config
  const [state, setState] = useState(initialUserState);
  const { login, isAuthenticated } = useContext(AuthContext);

  const { username, password } = state;

  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    console.info("Logging in...");
    login({ username, password });
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/dashboard");
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {}, [isAuthenticated]);

  return (
    <div
      className="container bg-white shadow p-5 mt-5 text-center"
      style={{ width: "24rem" }}
    >
      <img
        src="https://www.educational-access.org/wp-content/uploads/2016/02/Logo-CS5-GothamBold.png"
        width="100%"
        alt="BEAM Logo"
      />
      <form className="text-left" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            name="username"
            type="text"
            value={username}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;

// ==== INITIAL STATES ==== //
const initialUserState = {
  username: "",
  password: ""
};
