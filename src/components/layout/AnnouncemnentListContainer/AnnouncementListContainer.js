import React, { useEffect, useState, Fragment, useContext } from "react";
import AnnouncementList from "../AnnouncementList/AnnouncementList";
import CycleSpinner from "../../spinners/CycleSpinner/CycleSpinner";
import axios from "axios";
import AuthContext from "../../../context/auth/authContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const AnnouncementListContainer = () => {
  const { loadingProfile, profile } = useContext(AuthContext);

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const getAnnouncements = async () => {
      const announcements = await fetchAnnouncements(profile);
      setAnnouncements(announcements);
    };
    if (!loadingProfile && profile) {
      if (announcements.length === 0) {
        getAnnouncements();
      }
    }
    //eslint-disable-next-line
  }, [loadingProfile, profile]);

  return (
    <Fragment>
      <h6>
        <strong>ANNOUNCEMENTS:</strong>
      </h6>
      {announcements.length === 0 ? (
        <div className="div text-center">
          <div className="spinner-border text-center" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <AnnouncementList announcements={announcements} />
      )}
    </Fragment>
  );
};

export default AnnouncementListContainer;

const fetchAnnouncements = async person => {
  try {
    const regionResponse = await axios.get(
      `${process.env.REACT_APP_PORTAL_API_BASE_URL}/announcements?regions[in]=${person.region}`
    );
    const recipientSpecificResponse = await axios.get(
      `${process.env.REACT_APP_PORTAL_API_BASE_URL}/announcements?recipients[in]=${person._id}`
    );

    const regionalAnnouncements = regionResponse.data?.data.filter(
      announcement => announcement.recipients.length === 0
    );
    const recipientSpecificAnnouncements = recipientSpecificResponse.data?.data;

    const announcements = [
      ...regionalAnnouncements,
      ...recipientSpecificAnnouncements
    ].map(announcement => announcement.message);

    return announcements;
  } catch (err) {
    console.error(err);
    return [];
  }
};
