import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProfileState from "./context/profile/ProfileState";
import DashboardPage from "./components/pages/DashboardPage/DashboardPage";
import "./App.module.css";
import { messages } from "./loadingMessages.json";
import { withAuthentication } from './utils/auth0/with-authentication'
import { useAuth0 } from "./utils/auth0/provider";


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
          <Route exact path="/" component={DashboardPage} />
        </Switch>
      </Router>
    </ProfileState>
  );
};

export default withAuthentication(App);
