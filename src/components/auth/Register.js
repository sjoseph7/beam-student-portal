import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Register = () => {
  const { setAlert } = useContext(AlertContext);

  // User State config
  const [user, setUser] = useState(initialUserState);

  const { email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords don't match", "danger");
    }

    console.log("Register Submission!");
  };
  return (
    <div>
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input name="email" type="email" value={email} onChange={onChange} />
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
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            name="password2"
            type="text"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;

// ==== INITIAL STATES ==== //
const initialUserState = {
  email: "",
  password: "",
  password2: ""
};

// ==== HELPERS ====//
