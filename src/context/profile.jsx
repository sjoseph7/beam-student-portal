import React, { useState, useEffect, useContext, createContext } from "react";
import { getGlobalConfig } from "../utils/config";
import { useAuth0 } from "./auth0/provider";


const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext)

export const ProfileProvider = ({ children }) => {
  const { loading: auth0loading, user, token } = useAuth0();
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  // Load User Profile
  useEffect(() => {
    if (auth0loading) return
    loadAllData(
      // react hooks must be called from within a component function
      x => setData(x),
      x => setLoading(x),
      user,
      token,
    ).then(console.log).catch(console.error)
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
  );
};

async function loadAllData(setData, setLoading, user, token) {
  const data = {}
  const extendData = (x) => Object.assign(data, x)

  const promises = []

  promises.push(loadUserProfile(extendData, user))

  await Promise.all(promises)

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
    const endpoint = `${apiBaseUrl}/${path}`;

    const headers = { Authorization: `Bearer ${token}` }

    const response = await fetch(endpoint, { headers });

    if (response.ok) {
      return await response.json()
    } else {
      console.error(await response.text())
    }
  }

  async function loadUserProfile (setData, user) {
    const { userId } = user;
    const response = await get(`/people/${userId}`);

    const profile = response.data
    setData({ profile });

    return profile
  };
}
