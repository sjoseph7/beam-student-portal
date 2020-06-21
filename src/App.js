import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardPage from "./components/pages/DashboardPage/DashboardPage";
import "./App.module.css";
import { messages } from "./loadingMessages.json";
import { withAuthentication } from './context/auth0/with-authentication'
import { useAuth0 } from "./context/auth0/provider";


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
    <Router>
      <Switch>
        <Route exact path="/" component={DashboardPage} />
      </Switch>
    </Router>
  );
};

export default withAuthentication(App);
