import React, { useEffect, useState, Fragment, useContext } from "react";
import AnnouncementList from "../AnnouncementList/AnnouncementList";
import CycleSpinner from "../../spinners/CycleSpinner/CycleSpinner";
import axios from "axios";
import AuthContext from "../../../context/auth/authContext";

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
      <h3>Announcements:</h3>
      {announcements.length === 0 ? (
        <CycleSpinner />
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
      `http://localhost:4000/api/v2/announcements?regions[in]=${person.region}`
    );
    const recipientSpecificResponse = await axios.get(
      `http://localhost:4000/api/v2/announcements?recipients[in]=${person._id}`
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
