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
    <div>
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="text"
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
  username: "admin",
  password: "asdfasdf"
};
