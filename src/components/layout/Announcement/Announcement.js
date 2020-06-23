import React from 'react'

const Announcement = ({ message }) => {
  return message.split('\n').map((line, i) => (
    <span key={i}>
      <strong>{line}</strong>
      <br />
    </span>
  ))
}

export default Announcement
