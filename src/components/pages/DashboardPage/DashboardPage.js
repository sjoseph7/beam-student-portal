import React from "react";
import AnnouncementListContainer from "../../layout/AnnouncemnentListContainer/AnnouncementListContainer";
import ScheduleContainer from "../../layout/ScheduleContainer/ScheduleContainer";
import { useContext } from "react";
import AuthContext from "../../../context/auth/authContext";
import { useEffect } from "react";

const DashboardPage = props => {
  const { logout, isAuthenticated } = useContext(AuthContext);

  const logUserOut = () => {
    logout();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/login");
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div>
      <button type="button" onClick={logUserOut}>
        LOGOUT
      </button>
      {/* // <!-- TODO Componentize --> */}
      <h1>Welcome to BEAM Los Angeles!</h1>
      <h2>
        <em>We're really excited that you're here</em>
      </h2>
      <AnnouncementListContainer />
      <ScheduleContainer />
      {/* // <!-- TODO: Componentize this --> */}
      <p>Helpful links:</p>
      <ul>
        <li>
          <a href="#!">Zulip, for chatting</a>
        </li>
        <li>
          <a href="#!">OpenLearning</a>
        </li>
        <li>
          <a href="#!">Brilliant</a>
        </li>
        <li>
          <a href="#!">Art of Problem Solving</a>
        </li>
        <li>
          <a href="#!">The 100 Problem Challenge</a>
        </li>
        <li>
          <a href="#!">Challenge Problems</a>
        </li>
      </ul>

      <p>Your schedule in detail:</p>
      <em>TBD</em>

      {/* // <!-- TODO: Componentize this --> */}
      <p>Need help?</p>
      <ul>
        <li>
          <a href="#!">Tech support</a>
        </li>
        <li>
          <a href="#!">Talk to our Guidance Counselor</a>
        </li>
        <li>
          <a href="#!">
            Talk to the Director of Student Life (for questions about
            activities)
          </a>
        </li>
        <li>
          <a href="#!">
            Talk to your Site Director (for anything about the program!)
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DashboardPage;
