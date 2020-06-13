import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import DashboardPage from "./components/pages/DashboardPage/DashboardPage";

import { setAuthToken } from "./utils/auth";
import LoadUser from "./components/auth/LoadUser";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <LoadUser />
      <AlertState>
        <Router>
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={DashboardPage} />
          </Switch>
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;
