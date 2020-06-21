import React, { useEffect, useState } from "react";
import AnnouncementListContainer from "../../layout/AnnouncemnentListContainer/AnnouncementListContainer";
import ScheduleContainer from "../../layout/ScheduleContainer/ScheduleContainer";
import Navbar from "../../layout/Navbar/Navbar";
import axios from "axios";
import { getGlobalConfig } from "../../../utils/config";
import { useAuth0 } from "../../../context/auth0/provider";
import { useProfile } from "../../../context/profile";


const DashboardPage = props => {
  const { user, token } = useAuth0();
  const { profile } = useProfile();
  const [region, setRegion] = useState({});
  const [loadingRegion, setLoadingRegion] = useState(true);

  useEffect(() => {
    const getRegionData = async () => {
      try {
        const opts = { headers: { Authorization: `Bearer ${token}` } };
        const { apiBaseUrl } = getGlobalConfig()
        const regionData = await axios.get(
          `${apiBaseUrl}/regions/${
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

    if (profile && loadingRegion) {
      console.log("loading region[0]");
      getRegionData();
    }

    //eslint-disable-next-line
  }, [user, profile]);

  return (
    <>
      <Navbar />

      <div className="text-center">
        <div className="container mb-5">
          {/* // <!-- TODO Componentize --> */}
          <h6 className="mt-5">
            {region.siteContent?.title ||
              "I'm unsure of where you are at the moment..."}
          </h6>
          <h6>
            {region.siteContent?.subTitle || "Please contact an administrator"}
          </h6>

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
              {(region.siteContent?.links || [])
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
                  {(region.siteContent?.links || [])
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
    </>
  );
};

export default DashboardPage;
