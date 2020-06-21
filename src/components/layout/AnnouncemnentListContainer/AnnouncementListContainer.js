import React from 'react'
import AnnouncementList from '../AnnouncementList/AnnouncementList'
import { useProfile } from '../../../context/profile'

const AnnouncementListContainer = () => {
  const { announcements } = useProfile()

  return (
    <>
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
    </>
  )
}

export default AnnouncementListContainer
