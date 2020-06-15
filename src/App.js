import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import DashboardPage from "./components/pages/DashboardPage/DashboardPage";

import { setAuthToken } from "./utils/auth";
import LoadUser from "./components/auth/LoadUser";
import Navbar from "./components/layout/Navbar/Navbar";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AlertState>
      <AuthState>
        <LoadUser />
        <Router>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={DashboardPage} />
          </Switch>
        </Router>
      </AuthState>
    </AlertState>
  );
};

export default App;
