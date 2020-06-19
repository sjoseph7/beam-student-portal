import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert/Alert";
import DashboardPage from "./components/pages/DashboardPage/DashboardPage";

import { setAuthToken } from "./utils/auth";
import { withAuthentication } from './utils/auth0/with-authentication'
import LoadUser from "./components/auth/LoadUser";
import Navbar from "./components/layout/Navbar/Navbar";
import { MainPage } from "./components/pages/MainPage";

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
            <Route exact path="/" component={MainPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={DashboardPage} />
          </Switch>
        </Router>
      </AuthState>
    </AlertState>
  );
};

export default withAuthentication(App);
