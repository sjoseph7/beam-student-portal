import React, { useState, useEffect, useContext, createContext } from 'react'
import moment from 'moment'
import { getGlobalConfig } from '../utils/config'
import { useAuth0 } from './auth0'

const ProfileContext = createContext()
export const useProfile = () => useContext(ProfileContext)

export const ProfileProvider = ({ children }) => {
  const { loading: auth0loading, user, token } = useAuth0()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  useEffect(() => {
    if (auth0loading) return
    loadAllData(
      // react hooks must be called from within a component function
      (x) => setData(x),
      (x) => setLoading(x),
      user,
      token,
    )
      .then(console.log)
      .catch(console.error)
  }, [auth0loading, token, user])

  // Clear Errors
  return (
    <ProfileContext.Provider
      value={{
        loading,
        ...data,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

async function loadAllData(setData, setLoading, user, token) {
  const data = {}

  data.profile = loadUserProfile()
  data.region = loadRegionData()
  data.announcements = loadAnnouncements()
  data.schedule = loadSchedule()

  await Promise.all(
    Object.entries(data).map(async ([k, p]) => (data[k] = await p)),
  )

  console.log(data)
  setData(data)
  setLoading(false)

  return

  // -----------------------
  // helper functions are hoisted
  // -----------------------
  async function get(path) {
    path = path.replace(/^\/+/, '')
    const { apiBaseUrl } = getGlobalConfig()
    const endpoint = `${apiBaseUrl}/${path}`

    const headers = { Authorization: `Bearer ${token}` }

    const response = await fetch(endpoint, { headers })

    if (response.ok) {
      return (await response.json()).data
    } else {
      console.error(await response.text())
    }
  }

  async function loadUserProfile() {
    const { userId } = user
    return await get(`/people/${userId}`)
  }

  async function loadRegionData() {
    const { regions } = await data.profile
    return await get(`/regions/${regions[0]}`)
  }

  async function loadAnnouncements() {
    const { regions, _id } = await data.profile
    const regionAnnouncements = await get(
      `/announcements?regions[in]=${regions}`,
    )
    const targetAnnouncements = await get(
      `/announcements?recipients[in]=${_id}`,
    )

    const announcements = [
      ...regionAnnouncements.filter((x) => !x.recipients.length),
      ...targetAnnouncements,
    ].map(({ message }) => message)

    return announcements
  }

  async function loadSchedule() {
    const { regions, _id } = await data.profile
    const now = getGlobalConfig().useDemoDateTimeForSchedule
      ? '2020-06-22 09:40'
      : ''

    const currentDay = moment(now).format('dddd').toLowerCase()
    // const regionalEvents = await get(
    //   `/schedule-items?region[in]=${regions}&days[in]=${currentDay}`,
    // )
    // const hostedEvents = await get(
    //   `/schedule-items?hosts[in]=${_id}&days[in]=${currentDay}`,
    // )
    const participantEvents = await get(
      `/schedule-items?participants[in]=${_id}&days[in]=${currentDay}`,
    )

    // const filteredRegionalEvents = regionalEvents
    //   .filter(({ participants }) => participants.length === 0)
    //   .filter(
    //     ({ hosts }) => hosts.filter((host) => host._id === _id).length === 0,
    //   )

    const lineItems = [
      // ...filteredRegionalEvents,
      // ...hostedEvents,
      ...participantEvents,
    ]

    return { lineItems, now }
  }
}
