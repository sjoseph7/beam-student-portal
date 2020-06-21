import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client from '@auth0/auth0-spa-js'

const AUTH0_CONFIG = {
  domain: 'beammath.us.auth0.com',
  client_id: 'q6HSnNAXqcve54js2436u95SV2lmxY7p',
  audience: 'https://beam-portal-api.herokuapp.com/api/v2/',
  redirect_uri: window.location.protocol + '//' + window.location.host,
}

export const Auth0Context = React.createContext()
export const useAuth0 = () => useContext(Auth0Context)

export const Auth0Provider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [{ user, token, logout }, setAuthState] = useState({})

  useEffect(() => {
    initAuth0().then(console.log).catch(console.error)

    async function initAuth0() {
      const auth0Client = await createAuth0Client(AUTH0_CONFIG)
      let isAuthenticated = await auth0Client.isAuthenticated()

      if (
        !isAuthenticated &&
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        await auth0Client.handleRedirectCallback()
        isAuthenticated = await auth0Client.isAuthenticated()
      }

      window.history.replaceState({}, document.title, window.location.pathname)

      if (isAuthenticated) {
        const auth0user = await auth0Client.getUser()
        const {
          'https://beammath.net/username': username,
          'https://beammath.net/role': role,
          'https://beammath.net/sites': sites,
          email,
          given_name,
          family_name,
          name,
          nickname,
          sub,
        } = auth0user

        const user = {
          username,
          email,
          given_name,
          family_name,
          name,
          nickname,
          role,
          sites,
          userId: sub.split('|')[1],
        }

        const token = await auth0Client.getTokenSilently()

        setAuthState({
          user,
          token,
          logout: auth0Client.logout,
        })
        setLoading(false)
      } else {
        auth0Client.loginWithRedirect()
      }
    }
  }, [])

  return (
    <Auth0Context.Provider
      value={{
        loading,
        user,
        token,
        logout,
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
