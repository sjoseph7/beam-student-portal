import React, { Fragment, useEffect, useState } from "react";
import AnnouncementListContainer from "../../layout/AnnouncemnentListContainer/AnnouncementListContainer";
import ScheduleContainer from "../../layout/ScheduleContainer/ScheduleContainer";
import { useAuth0 } from "../../../react-auth0-spa";
import Navbar from "../../layout/Navbar/Navbar";
import ProfileContext from "../../../context/profile/profileContext";
import { useContext } from "react";
import axios from "axios";

const DashboardPage = props => {
  const { loading, user, getTokenSilently } = useAuth0();
  const { loadingProfile, profile, loadUserProfile } = useContext(
    ProfileContext
  );
  const [region, setRegion] = useState(null);
  const [loadingRegion, setLoadingRegion] = useState(true);

  useEffect(() => {
    const getRegionData = async () => {
      try {
        const token = await getTokenSilently();
        const opts = { headers: { Authorization: `Bearer ${token}` } };
        const regionData = await axios.get(
          `${process.env.REACT_APP_PORTAL_API_BASE_URL}/regions/${
            profile?.regions[0] || ""
          }`,
          opts
        );
        setRegion(regionData.data?.data || {});
        setLoadingRegion(false);
      } catch (err) {
        console.error(err);
      }
    };

    if (!loading && user && loadingProfile) {
      loadUserProfile();
      console.log("loading profile!");
    } else if (!loadingProfile && profile) {
      console.log("profile loaded!");
    } else if (!loadingProfile && !profile) {
      console.log("no profile...");
    }

    if (!loadingProfile && profile && loadingRegion) {
      console.log("loading region[0]");
      getRegionData();
    }

    //eslint-disable-next-line
  }, [loading, user, loadingProfile, profile]);

  if (loading || !user) {
    return <div>Cleaning up...</div>;
  }

  if (!profile || !region) {
    return <div>Finishing up...</div>;
  }

  return (
    <Fragment>
      <Navbar />

      <div className="text-center">
        <div className="container mb-5">
          {/* // <!-- TODO Componentize --> */}
          <h6 className="mt-5">{region.siteContent.title}</h6>
          <h6>{region.siteContent.subTitle}</h6>

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
              {region.siteContent.links
                .filter(link => link.type === "helpful")
                .map((link, index) => (
                  <li key={`helpful-${index}`}>
                    <a href={link.url}>{link.text}</a>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* <p>Your schedule in detail:</p><em>TBD</em> */}

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
                  {region.siteContent.links
                    .filter(link => link.type === "need-help")
                    .map((link, index) => (
                      <li key={`need-help-${index}`}>
                        <a href={link.url}>{link.text}</a>
                      </li>
                    ))}
                  {/* <li>
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
                      Talk to your Site Director (for anything about the
                      program!)
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default DashboardPage;
