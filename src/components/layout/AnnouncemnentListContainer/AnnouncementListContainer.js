import React, { useEffect, useState, Fragment } from "react";
import AnnouncementList from "../AnnouncementList/AnnouncementList";
import axios from "axios";
import { getGlobalConfig } from "../../../utils/config";
import { useAuth0 } from "../../../context/auth0/provider";
import { useProfile } from "../../../context/profile";


const AnnouncementListContainer = () => {
  const { token } = useAuth0();
  const { profile } = useProfile();

  const [announcements, setAnnouncements] = useState(null);

  useEffect(() => {
    const getAnnouncements = async () => {
      const announcements = await fetchAnnouncements(profile, token);
      setAnnouncements(announcements);
    };
    if (profile) {
      if (announcements === null) {
        getAnnouncements();
      }
    }
    //eslint-disable-next-line
  }, [profile]);

  return (
    <Fragment>
      <h6>
        <strong>ANNOUNCEMENTS:</strong>
      </h6>

      {announcements === null ? (
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

const fetchAnnouncements = async (person, token) => {
  try {
    const opts = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const { apiBaseUrl } = getGlobalConfig()

    const regionResponse = await axios.get(
      `${apiBaseUrl}/announcements?regions[in]=${person.regions}`,
      opts
    );
    const recipientSpecificResponse = await axios.get(
      `${apiBaseUrl}/announcements?recipients[in]=${person._id}`,
      opts
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
