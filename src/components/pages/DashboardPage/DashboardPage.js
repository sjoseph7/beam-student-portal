import React from "react";
import AnnouncementListContainer from "../../layout/AnnouncemnentListContainer/AnnouncementListContainer";
import ScheduleContainer from "../../layout/ScheduleContainer/ScheduleContainer";
import { useContext } from "react";
import AuthContext from "../../../context/auth/authContext";
import { useEffect } from "react";

const DashboardPage = props => {
  const { isAuthenticated, user, loadUserProfile } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/login");
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className="text-center">
      <div className="container mb-5">
        {/* <button className="btn btn-block" type="button" onClick={logUserOut}>
        LOGOUT
      </button> */}
        {/* // <!-- TODO Componentize --> */}
        <h6 className="mt-5">Welcome to BEAM Los Angeles!</h6>
        <h6>We're really excited that you're here</h6>

        <div className="my-5">
          <AnnouncementListContainer />
        </div>

        <ScheduleContainer />
      </div>
      {/* // <!-- TODO: Componentize this --> */}
      <div className="bg-white py-5 text-left">
        <div className="container">
          <h5>
            <strong>Helpful Links</strong>
          </h5>
          <ul className="list-unstyled">
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
        </div>
      </div>

      {/* <p>Your schedule in detail:</p>
      <em>TBD</em> */}

      {/* // <!-- TODO: Componentize this --> */}
      <footer className="bg-dark text-left pt-5 pb-3">
        <div className="container">
          <div className="row">
            <div className="col col-sm-5 col-md-4 col-lg-3 col-xl-2 text-white">
              <h5>
                <strong>NEED HELP?</strong>
              </h5>
              <h6>We have you covered.</h6>
            </div>
            <div className="col">
              <ul className="list-unstyled">
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
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
