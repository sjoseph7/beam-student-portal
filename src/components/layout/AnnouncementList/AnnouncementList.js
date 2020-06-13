import React from "react";
import Announcement from "../Announcement/Announcement";

const AnnouncementList = ({ announcements }) => {
  return announcements ? (
    announcements.map((announcement, index) => (
      <Announcement key={index} message={announcement} />
    ))
  ) : (
    <Announcement message="No announcements today!" />
  );
};

export default AnnouncementList;
