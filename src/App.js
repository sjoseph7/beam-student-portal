import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProfileState from "./context/profile/ProfileState";
import DashboardPage from "./components/pages/DashboardPage/DashboardPage";
import { useAuth0 } from "./react-auth0-spa";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./components/pages/LandingPage/LandingPage";
import "./App.module.css";
import { messages } from "./loadingMessages.json";

const App = () => {
  const { loading } = useAuth0();

  const [randomLoadingMessage, setRandomLoadingMessage] = useState("");

  useEffect(() => {
    setRandomLoadingMessage(
      messages[Math.floor(Math.random() * messages.length)]
    );
  }, []);

  if (loading) {
    return <div>{randomLoadingMessage}</div>;
  }

  return (
    <ProfileState>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute exact path="/dashboard" component={DashboardPage} />
        </Switch>
      </Router>
    </ProfileState>
  );
};

export default App;
