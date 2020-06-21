import React from 'react'
import moment from 'moment'
import { useProfile } from '../../../context/profile'

const SimpleScheduleLineItem = ({
  lineItem: { name, startTime, endTime, hosts, links },
}) => {
  const { now } = useProfile().schedule
  console.log(now)

  const [openLearningLinks, adobeConnectLinks] = sortLinksIntoGroups(links, [
    'open-learning',
    'adobe-connect',
  ])

  return (
    <>
      <div className="my-3">
        <span>
          {`${moment(startTime).format('h:mma')}-${moment(endTime).format(
            'h:mma',
          )}`}
        </span>
        <div
          className={`card ${
            isActiveItem(now, startTime, endTime) && 'shadow border-primary'
          }`}
        >
          <div className="card-body">
            {/* Componentize this */}
            {adobeConnectLinks.length > 0 &&
              (adobeConnectLinks.length === 1 ? (
                <a
                  href={adobeConnectLinks[0].url}
                  className="btn btn-primary ml-2 float-right"
                >
                  {adobeConnectLinks[0].text || 'Join Room'}
                </a>
              ) : (
                <div className="btn-group ml-2 float-right">
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Choose{' '}
                  </button>
                  <div className="dropdown-menu">
                    {adobeConnectLinks
                      .sort(sortLinksByText)
                      .map((adobeConnectLink, index) => (
                        <a
                          key={index}
                          className="dropdown-item"
                          href={adobeConnectLink.url}
                        >
                          {adobeConnectLink.text || 'Join!'}
                        </a>
                      ))}
                  </div>
                </div>
              ))}
            {/* /Componentize this */}

            {/* Componentize this */}
            {openLearningLinks.length > 0 &&
              (openLearningLinks.length === 1 ? (
                <a
                  href={openLearningLinks[0].url}
                  className="btn btn-secondary ml-2 float-right"
                >
                  {openLearningLinks[0].text || 'Join Room'}
                </a>
              ) : (
                <div className="btn-group ml-2 float-right">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Choose{' '}
                  </button>
                  <div className="dropdown-menu">
                    {openLearningLinks
                      .sort(sortLinksByText)
                      .map((adobeConnectLink, index) => (
                        <a
                          key={`ac-${index}`}
                          className="dropdown-item"
                          href={adobeConnectLink.url}
                        >
                          {adobeConnectLink.text || 'Join!'}
                        </a>
                      ))}
                  </div>
                </div>
              ))}
            {/* /Componentize this */}
            <h5 className="card-title">{name || 'No Name'}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              <em>With {hosts.map((host) => host.firstName).join(', ')}</em>
            </h6>
          </div>
        </div>
      </div>
    </>
  )
}

const sortLinksIntoGroups = (links, groupNames) => {
  return groupNames.map((groupName) =>
    links.filter((link) => link.type === groupName),
  )
}
export default SimpleScheduleLineItem

const isActiveItem = (now, startTime, endTime) => {
  const currentTime = moment(now).format('HHmm')
  startTime = moment(startTime).format('HHmm')
  endTime = moment(endTime).format('HHmm')
  return currentTime >= startTime && currentTime <= endTime
}

const sortLinksByText = (a, b) => {
  return a.text < b.text ? -1 : 1
}
