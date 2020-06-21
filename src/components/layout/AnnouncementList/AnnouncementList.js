import React from 'react'
import Announcement from '../Announcement/Announcement'

const AnnouncementList = ({ announcements }) => {
  return announcements && announcements.length > 0 ? (
    announcements.map((announcement, index) => (
      <Announcement key={index} message={announcement} />
    ))
  ) : (
    <p>No announcements today.</p>
  )
}

export default AnnouncementList
