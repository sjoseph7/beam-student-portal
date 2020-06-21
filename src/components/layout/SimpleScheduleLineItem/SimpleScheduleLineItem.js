import React from 'react'
import moment from 'moment'
import { useProfile, api_get } from '../../../context/profile'
import { useAuth0 } from '../../../context/auth0'

const SimpleScheduleLineItem = ({
  lineItem: { name, startTime, endTime, hosts, links },
}) => {
  const { token } = useAuth0()
  const { now } = useProfile().schedule

  const [openLearningLinks, adobeConnectLinks] = sortLinksIntoGroups(links, [
    'open-learning',
    'adobe-connect',
  ])

  const fixedAdobeConnectLinks = adobeConnectLinks.map((link) => {
    const { url } = link

    const matches = /^https:\/\/beam.adobeconnect.com(\/[^/]+\/?)$/.exec(url)
    if (!matches) return link

    const slug = matches[1]
    return {
      ...link,
      url: `https://beammath.us.auth0.com/samlp/8W8pxzvINgiyEM8aNvNoQBuKtjsW38xC?RelayState={"action":"CPS_WORKFLOW","redirect":"${slug}"}`,
    }
  })

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
            {fixedAdobeConnectLinks.length > 0 &&
              (fixedAdobeConnectLinks.length === 1 ? (
                <a
                  href={fixedAdobeConnectLinks[0].url}
                  target="_blank"
                  className="btn btn-primary ml-2 float-right"
                >
                  {fixedAdobeConnectLinks[0].text || 'Join Room'}
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
                    {fixedAdobeConnectLinks
                      .sort(sortLinksByText)
                      .map((adobeConnectLink, index) => (
                        <a
                          key={index}
                          className="dropdown-item"
                          href={adobeConnectLink.url}
                          target="_blank"
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
                  onClick={makeOpenLearningSSOHandler(
                    openLearningLinks[0].url,
                    token,
                  )}
                  href={openLearningLinks[0].url}
                  target="_blank"
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
                      .map((link, index) => (
                        <a
                          key={`ac-${index}`}
                          className="dropdown-item"
                          href={link.url}
                          target="_blank"
                          onclick={makeOpenLearningSSOHandler(link.url, token)}
                        >
                          {link.text || 'Join!'}
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

function makeOpenLearningSSOHandler(link, token) {
  return performSSOExchange

  async function performSSOExchange(e) {
    e.preventDefault()
    e.stopPropagation()

    const { ssoUrl } = await api_get(token, '/sso/open-learning')
    const url = new URL(ssoUrl)
    const urlParams = new URLSearchParams(url.search)
    url.search = ''

    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.name = 'transFrame'
    iframe.id = 'transFrame'
    document.body.appendChild(iframe)

    if (iframe.contentWindow.document.readyState !== 'complete')
      await new Promise((resolve) => (iframe.onload = resolve))

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = url.toString()
    form.target = 'transFrame'

    for (const [key, value] of urlParams) {
      const el = document.createElement('input')
      el.type = 'hidden'
      el.name = key
      el.value = value
      form.appendChild(el)
    }

    document.body.appendChild(form)
    form.submit()

    await new Promise((resolve) => (iframe.onload = resolve))

    window.open(link, '_blank')
  }
}
